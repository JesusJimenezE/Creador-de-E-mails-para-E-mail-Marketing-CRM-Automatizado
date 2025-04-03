import React, { useState, useEffect } from 'react';
import { db } from './../../components/firebaseconfig';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Cabe } from './../../components/Cabe'; // Importa el componente de cabecera.

export const Asiste = () => {
  const [servicios, setServicios] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const [hasEntrada, setHasEntrada] = useState(false);
  const [hasSalida, setHasSalida] = useState(false);
  const [horasTrabajadasHoy, setHorasTrabajadasHoy] = useState(0);
  const [horasTrabajadasTotales, setHorasTrabajadasTotales] = useState(0);

  // Escuchar el estado de autenticación
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        checkAsistencia(user.email);
        calcularHorasTrabajadasTotales(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Obtener los servicios del usuario autenticado
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'servicio'));
        const servicioData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        const serviciosFiltrados = servicioData.filter(
          (servicio) => servicio.correo === userEmail
        );
        setServicios(serviciosFiltrados);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    if (userEmail) {
      fetchServicios();
    }
  }, [userEmail]);

  // Verificar asistencia de hoy (entrada y salida)
  const checkAsistencia = async (email) => {
    try {
      const today = new Date().toISOString().split('T')[0];

      const q = query(
        collection(db, 'asistencia'),
        where('correo', '==', email),
        where('fecha', '==', today)
      );
      const querySnapshot = await getDocs(q);

      let entrada = null;
      let salida = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.tipo === 'entrada') entrada = data.hora;
        if (data.tipo === 'salida') salida = data.hora;
      });

      setHasEntrada(!!entrada);
      setHasSalida(!!salida);

      if (entrada && salida) {
        const horasTrabajadas = calcularDiferenciaHoras(entrada, salida);
        setHorasTrabajadasHoy(horasTrabajadas);
      } else {
        setHorasTrabajadasHoy(0);
      }
    } catch (error) {
      console.error('Error al verificar asistencia:', error);
    }
  };

  // Función para marcar asistencia
  const marcarAsistencia = async (tipo) => {
    if (!userEmail) return;

    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const horaActual = today.toTimeString().split(' ')[0]; // Solo HH:MM:SS

    if (tipo === 'entrada' && hasEntrada) {
      alert('Ya has marcado entrada hoy.');
      return;
    }

    if (tipo === 'salida' && !hasEntrada) {
      alert('No puedes marcar salida sin haber registrado entrada.');
      return;
    }

    if (tipo === 'salida' && hasSalida) {
      alert('Ya has marcado salida hoy.');
      return;
    }

    try {
      // Registrar la asistencia (entrada o salida)
      await addDoc(collection(db, 'asistencia'), {
        correo: userEmail,
        fecha: todayString,
        hora: horaActual,
        tipo: tipo
      });

      alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrada correctamente.`);

      if (tipo === 'salida') {
        // Revisa la asistencia para obtener los horarios actualizados
        await checkAsistencia(userEmail);

        // Recalcula todas las horas trabajadas después de marcar salida
        await calcularHorasTrabajadasTotales(userEmail);

        const horasRestadas = horasTrabajadasHoy;

        // Actualiza las horas del servicio correspondiente
        if (servicios.length > 0) {
          const idServicio = servicios[0].id;
          await actualizarHorasServicio(idServicio, horasRestadas);
        }
      }

      // Refresca los estados de entrada/salida
      checkAsistencia(userEmail);
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
    }
  };

  // Calcula la diferencia de horas entre entrada y salida
  const calcularDiferenciaHoras = (entrada, salida) => {
    const [hEntrada, mEntrada, sEntrada] = entrada.split(':').map(Number);
    const [hSalida, mSalida, sSalida] = salida.split(':').map(Number);

    const fechaEntrada = new Date();
    fechaEntrada.setHours(hEntrada, mEntrada, sEntrada);

    const fechaSalida = new Date();
    fechaSalida.setHours(hSalida, mSalida, sSalida);

    const diferenciaMs = fechaSalida - fechaEntrada;
    const diferenciaHoras = diferenciaMs / 1000 / 60 / 60;

    return diferenciaHoras > 0 ? diferenciaHoras : 0;
  };

  // Calcula las horas trabajadas totales de todas las asistencias
  const calcularHorasTrabajadasTotales = async (email) => {
    try {
      const q = query(
        collection(db, 'asistencia'),
        where('correo', '==', email)
      );
      const querySnapshot = await getDocs(q);

      const registros = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        registros.push({
          fecha: data.fecha,
          hora: data.hora,
          tipo: data.tipo
        });
      });

      // Agrupar por fecha
      const registrosPorFecha = {};
      registros.forEach((registro) => {
        if (!registrosPorFecha[registro.fecha]) {
          registrosPorFecha[registro.fecha] = { entrada: null, salida: null };
        }
        if (registro.tipo === 'entrada') {
          registrosPorFecha[registro.fecha].entrada = registro.hora;
        }
        if (registro.tipo === 'salida') {
          registrosPorFecha[registro.fecha].salida = registro.hora;
        }
      });

      // Calcular las horas trabajadas en cada día
      let sumaHoras = 0;
      for (const fecha in registrosPorFecha) {
        const { entrada, salida } = registrosPorFecha[fecha];
        if (entrada && salida) {
          const horasDia = calcularDiferenciaHoras(entrada, salida);
          sumaHoras += horasDia;
        }
      }

      setHorasTrabajadasTotales(sumaHoras);
      console.log(`Horas trabajadas totales: ${sumaHoras} hrs`);
    } catch (error) {
      console.error('Error al calcular las horas trabajadas totales:', error);
    }
  };

  // Actualiza las horas restantes en el servicio
  const actualizarHorasServicio = async (idServicio, horasRestadas) => {
    try {
      const servicioRef = doc(db, 'servicio', idServicio);

      const servicioActual = servicios.find(
        (servicio) => servicio.id === idServicio
      );

      if (!servicioActual) {
        console.error('Servicio no encontrado');
        return;
      }

      const horasActuales = parseFloat(servicioActual.horas) || 0;
      const nuevasHoras = horasActuales - horasRestadas;

      await updateDoc(servicioRef, {
        horas: nuevasHoras.toFixed(2)
      });

      console.log(`Horas actualizadas a ${nuevasHoras} hrs`);

      setServicios((prevServicios) =>
        prevServicios.map((servicio) =>
          servicio.id === idServicio
            ? { ...servicio, horas: nuevasHoras }
            : servicio
        )
      );
    } catch (error) {
      console.error('Error al actualizar horas del servicio:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabe /> {/* Muestra el componente de cabecera */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Marca entrada y salida
        </h2>

        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Horas totales</th>
                <th className="px-4 py-2">Horas actuales</th>
                <th className="px-4 py-2">Tipo de servicio</th>
                <th className="px-4 py-2">Escuela</th>
              </tr>
            </thead>
            <tbody>
              {servicios.length > 0 ? (
                servicios.map((servicio) => {
                  const horasTotales = parseFloat(servicio.horas) || 0;
                  const horasActuales = horasTotales - horasTrabajadasTotales;

                  return (
                    <tr
                      key={servicio.id}
                      className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition"
                    >
                      <td className="px-4 py-2 text-center">
                        {servicio.nombre || 'N/A'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {horasTotales.toFixed(2)} hrs
                      </td>
                      <td className="px-4 py-2 text-center">
                        {horasActuales.toFixed(2)} hrs
                      </td>
                      <td className="px-4 py-2 text-center">
                        {servicio.tipo || 'N/A'}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {servicio.escuela || 'N/A'}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-gray-500"
                  >
                    No se encontraron registros
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => marcarAsistencia('entrada')}
            className={`bg-green-500 text-white font-semibold py-3 px-8 rounded-lg mx-2 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition ${
              hasEntrada ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={hasEntrada}>
            Entrada
          </button>
          <button
            onClick={() => marcarAsistencia('salida')}
            className={`bg-blue-500 text-white py-3 px-8 rounded-lg mx-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition ${
              !hasEntrada || hasSalida ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!hasEntrada || hasSalida}>
            Salida
          </button>
        </div>
      </div>
    </div>
  );
};

export default Asiste;
