import React, { useEffect, useState } from 'react'; // Importa React y los hooks useState y useEffect para manejar estados y efectos secundarios
import { Cabe } from '../components/Cabe'; // Componente de cabecera para la página
import { Piep } from '../components/Piep'; // Componente de pie de página
import { db } from '../components/firebaseconfig'; // Configuración de Firebase para conectarse a la base de datos
import { collection, getDocs } from 'firebase/firestore'; // Funciones de Firestore para obtener datos de una colección

export const Regisenvi = () => {
  const [envios, setEnvios] = useState([]); // Estado para almacenar los datos de los envíos obtenidos de Firestore
  const [currentPage, setCurrentPage] = useState(1); // Estado para manejar la página actual en la paginación
  const itemsPerPage = 15; // Número de elementos a mostrar por página
  const [searchTerm, setSearchTerm] = useState(''); // Estado para manejar el término de búsqueda introducido por el usuario

  // Hook para cargar datos de Firestore al montar el componente
  useEffect(() => {
    const cargarEnvios = async () => {
      try {
        // Obtiene los documentos de la colección 'envios' desde Firestore
        const querySnapshot = await getDocs(collection(db, 'envios'));
        // Mapea los datos obtenidos, incluyendo el ID del documento
        const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEnvios(datos); // Almacena los datos en el estado
      } catch (error) {
        console.error('Error al obtener los datos de Firestore: ', error); // Muestra un error si falla la obtención de datos
      }
    };
    cargarEnvios(); // Llama a la función para cargar los datos
  }, []); // Este efecto solo se ejecuta una vez, al montar el componente

  // Filtrar los envíos según el término de búsqueda introducido
  const filteredEnvios = envios.filter((envio) =>
    envio.remitente.toLowerCase().includes(searchTerm.toLowerCase()) || // Coincidencia en el remitente
    envio.asunto.toLowerCase().includes(searchTerm.toLowerCase()) // Coincidencia en el asunto
  );

  // Lógica para la paginación
  const indexOfLastItem = currentPage * itemsPerPage; // Índice del último elemento en la página actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice del primer elemento en la página actual
  const currentItems = filteredEnvios.slice(indexOfFirstItem, indexOfLastItem); // Elementos a mostrar en la página actual

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100"> {/* Contenedor principal con estilo de fondo */}
      <Cabe /> {/* Componente de cabecera */}
      <div className="p-6">
        {/* Barra de búsqueda */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="text" // Tipo de entrada: texto
            placeholder="Buscar por remitente o asunto..." // Texto de ayuda en el input
            value={searchTerm} // Vincula el estado del término de búsqueda al valor del input
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado al escribir
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600" // Clases de Tailwind para estilo
          />
        </div>

        {/* Tabla para mostrar los datos */}
        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white"> {/* Cabecera de la tabla */}
              <tr>
                <th className="px-4 py-2">Remitente</th>
                <th className="px-4 py-2">Destinatario</th>
                <th className="px-4 py-2">Asunto</th>
                <th className="px-4 py-2">Contenido</th>
                <th className="px-4 py-2">Archivo adjunto</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((envio) => ( // Recorre los elementos de la página actual
                <tr
                  key={envio.id} // Identificador único para cada fila
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition" // Estilos para filas alternas y efecto hover
                >
                  <td className="px-4 py-2 text-center">{envio.remitente}</td>
                  <td className="px-4 py-2 text-center">{envio.destinatario}</td>
                  <td className="px-4 py-2 text-center">{envio.asunto}</td>
                  <td className="px-4 py-2 text-center">{envio.contenido}</td>
                  <td className="px-4 py-2 text-center">{envio.adjunto ? 'Sí' : 'No'}</td>
                  <td className="px-4 py-2 text-center">{new Date(envio.fecha).toLocaleDateString()}</td> {/* Formato de fecha */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(Math.ceil(filteredEnvios.length / itemsPerPage))].map((_, index) => (
            <button
              key={index} // Identificador único para cada botón de página
              onClick={() => paginate(index + 1)} // Cambia la página actual
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-gray-500 transition" // Clases de Tailwind para estilo
            >
              {index + 1} {/* Número de la página */}
            </button>
          ))}
        </div>
      </div>
      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Regisenvi; // Exporta el componente para usarlo en otras partes del proyecto
