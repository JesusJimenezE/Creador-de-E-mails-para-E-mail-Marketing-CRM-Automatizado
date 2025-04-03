import React, { useState, useEffect } from 'react';
import { db } from './../../components/firebaseconfig';
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Cabe } from './../../components/Cabe'; // Importa el componente de cabecera.

export const Asiste = () => {
  // Estados para almacenar los datos necesarios
  const [servicios, setServicios] = useState([]); // Lista de servicios del usuario
  const [userEmail, setUserEmail] = useState(null); // Correo del usuario autenticado
  const [hasEntrada, setHasEntrada] = useState(false); // Indica si ya se marcó la entrada hoy
  const [hasSalida, setHasSalida] = useState(false); // Indica si ya se marcó la salida hoy
  const [horasTrabajadasHoy, setHorasTrabajadasHoy] = useState(0); // Horas trabajadas en el día
  const [horasTrabajadasTotales, setHorasTrabajadasTotales] = useState(0); // Total de horas trabajadas

  // Escuchar el estado de autenticación
  useEffect(() => {
    const auth = getAuth();

    // Detecta cambios en el usuario autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        checkAsistencia(user.email); // Verifica si el usuario ya marcó entrada/salida hoy
        calcularHorasTrabajadasTotales(user.email); // Calcula todas las horas trabajadas
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

        // Filtrar los servicios que correspondan al usuario autenticado
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

      // Si ya hay una entrada y salida, calcular la diferencia de horas
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

    // Validaciones para evitar registros incorrectos
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
      // Registrar la asistencia en la base de datos
      await addDoc(collection(db, 'asistencia'), {
        correo: userEmail,
        fecha: todayString,
        hora: horaActual,
        tipo: tipo
      });

      alert(`${tipo.charAt(0).toUpperCase() + tipo.slice(1)} registrada correctamente.`);

      if (tipo === 'salida') {
        await checkAsistencia(userEmail);
        await calcularHorasTrabajadasTotales(userEmail);
        const horasRestadas = horasTrabajadasHoy;

        // Actualiza las horas del servicio correspondiente
        if (servicios.length > 0) {
          const idServicio = servicios[0].id;
          await actualizarHorasServicio(idServicio, horasRestadas);
        }
      }

      checkAsistencia(userEmail);
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
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

        {/* Botones para marcar entrada y salida */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => marcarAsistencia('entrada')}
            className={`bg-green-500 text-white font-semibold py-3 px-8 rounded-lg mx-2 hover:bg-green-600 transition ${
              hasEntrada ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={hasEntrada}>
            Entrada
          </button>
          <button
            onClick={() => marcarAsistencia('salida')}
            className={`bg-blue-500 text-white py-3 px-8 rounded-lg mx-2 hover:bg-blue-600 transition ${
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
