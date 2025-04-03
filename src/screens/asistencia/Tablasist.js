import React, { useState, useEffect } from 'react';
import { db } from './../../components/firebaseconfig';
import { collection, getDocs, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Cabe } from './../../components/Cabe'; // Importa el componente de cabecera.

export const Tablasist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [servicio, setServicio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const navigate = useNavigate();

  const handleButtonClick = () => navigate('/regisr');

  // Función para calcular la diferencia de horas entre entrada y salida
  const calcularDiferenciaHoras = (entrada, salida) => {
    const [hEntrada, mEntrada, sEntrada] = entrada.split(':').map(Number);
    const [hSalida, mSalida, sSalida] = salida.split(':').map(Number);

    const fechaEntrada = new Date();
    fechaEntrada.setHours(hEntrada, mEntrada, sEntrada);

    const fechaSalida = new Date();
    fechaSalida.setHours(hSalida, mSalida, sSalida);

    const diferenciaMs = fechaSalida - fechaEntrada;
    const diferenciaHoras = diferenciaMs / 1000 / 60 / 60;

    console.log(`Entrada: ${entrada}, Salida: ${salida}, Horas trabajadas: ${diferenciaHoras}`);

    return diferenciaHoras > 0 ? diferenciaHoras : 0;
  };

  // Obtener datos de servicio y calcular horas trabajadas
  useEffect(() => {
    const fetchServicio = async () => {
      setLoading(true);

      try {
        // Obtener todos los registros de la colección
        const servicioQuery = query(collection(db, 'servicio'));
        const servicioSnapshot = await getDocs(servicioQuery);

        const servicioData = await Promise.all(
          servicioSnapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();

            // Buscar asistencias por correo 
            const asistenciaQuery = query(
              collection(db, 'asistencia'), 
              where('correo', '==', data.correo)
            );

            const asistenciaSnapshot = await getDocs(asistenciaQuery);

            // Calcular horas trabajadas
            let horasActuales = 0;
            const registrosPorFecha = {};

            asistenciaSnapshot.docs.forEach((asistDoc) => {
              const asistData = asistDoc.data();
              const fecha = asistData.fecha;
              const tipo = asistData.tipo;
              const hora = asistData.hora;

              console.log(`Registro de asistencia:`, asistData); 

              if (!registrosPorFecha[fecha]) {
                registrosPorFecha[fecha] = { entrada: null, salida: null };
              }

              if (tipo === 'entrada') {
                registrosPorFecha[fecha].entrada = hora;
              } else if (tipo === 'salida') {
                registrosPorFecha[fecha].salida = hora;
              }
            });

            // Sumar horas trabajadas por día
            for (const fecha in registrosPorFecha) {
              const { entrada, salida } = registrosPorFecha[fecha];
              if (entrada && salida) {
                horasActuales += calcularDiferenciaHoras(entrada, salida);
              }
            }

            console.log(`Usuario: ${data.nombre} | Horas actuales: ${horasActuales}`);

            return {
              id: docSnap.id,
              ...data,
              horasActuales,
            };
          })
        );

        setServicio(servicioData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setLoading(false);
      }
    };

    fetchServicio();
  }, []); // Sin dependencias, se ejecuta solo una vez al montar el componente

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'servicio', id));
    setServicio(servicio.filter((serv) => serv.id !== id));
  };

  const filteredServicio = servicio.filter((serv) =>
    serv.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    serv.horas.toString().includes(searchTerm)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredServicio.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabe /> {/* Muestra el componente de cabecera */}
      <div className="p-6">
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre u Horas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none transition-colors duration-300"
          >
            Agregar nuevo integrante
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-700 font-semibold">Cargando datos...</div>
        ) : (
          <div className="overflow-hidden bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Correo</th>
                  <th className="px-4 py-2">Horas totales</th>
                  <th className="px-4 py-2">Horas actuales</th>
                  <th className="px-4 py-2">Tipo de servicio</th>
                  <th className="px-4 py-2">Escuela</th>
                  <th className="px-4 py-2">Estatus</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((servicio) => {
                  const horasTotales = parseFloat(servicio.horas) || 0;
                  const horasActuales = parseFloat(servicio.horasActuales) || 0;

                  const estatus = horasActuales >= horasTotales
                    ? 'Finalizado'
                    : `Faltan por atender (${(horasTotales - horasActuales).toFixed(2)} horas)`;

                  return (
                    <tr key={servicio.id} className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition">
                      <td className="px-4 py-2 text-center">{servicio.nombre}</td>
                      <td className="px-4 py-2 text-center">{servicio.correo}</td>
                      <td className="px-4 py-2 text-center">{horasTotales.toFixed(2)} hrs</td>
                      <td className="px-4 py-2 text-center">{horasActuales.toFixed(2)} hrs</td>
                      <td className="px-4 py-2 text-center">{servicio.tipo}</td>
                      <td className="px-4 py-2 text-center">{servicio.escuela}</td>
                      <td className="px-4 py-2 text-center font-semibold text-sm">
                        {estatus === 'Finalizado' ? (
                          <span className="text-green-600">{estatus}</span>
                        ) : (
                          <span className="text-yellow-600">{estatus}</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(servicio.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700 transition">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINACIÓN */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(Math.ceil(filteredServicio.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-md focus:outline-none ${
                currentPage === index + 1
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tablasist;