import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import React, { useEffect, useState } from 'react'; // Importamos React y los hooks useEffect y useState
import { db } from '../components/firebaseconfig'; // Importamos la configuración de Firebase
import { useNavigate } from 'react-router-dom'; // Hook para redireccionar a otras rutas
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Funciones de Firestore para obtener y eliminar datos

// Componente principal que gestiona la visualización y manipulación de contactos
export const Contac = () => {
  const [contactos, setContactos] = useState([]); // Estado para almacenar la lista de contactos
  const [currentPage, setCurrentPage] = useState(1); // Estado para gestionar la página actual en la paginación
  const itemsPerPage = 30; // Número de contactos a mostrar por página
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const navigate = useNavigate(); // Hook para redirigir al usuario a otra ruta

  // Función que redirige a la página de creación de un nuevo contacto
  const handleButtonClick = () => navigate('/nuecont');

  // Hook useEffect para cargar los contactos al montar el componente
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        // Obtenemos los datos de la colección 'contactos' en Firestore
        const querySnapshot = await getDocs(collection(db, 'contactos'));
        // Mapeamos los datos para incluir el ID del documento
        const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContactos(datos); // Actualizamos el estado con los datos obtenidos
      } catch (error) {
        console.error('Error al obtener los datos de Firestore: ', error); // Manejo de errores
      }
    };
    cargarContactos(); // Llamamos a la función para cargar los datos
  }, []); // Dependencias vacías: solo se ejecuta al montar el componente

  // Función para eliminar un contacto por su ID
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'contactos', id)); // Eliminamos el documento de Firestore
      setContactos(contactos.filter((contacto) => contacto.id !== id)); // Filtramos los contactos eliminados del estado
      alert('Contacto eliminado exitosamente'); // Mostramos un mensaje de éxito
    } catch (error) {
      console.error('Error al eliminar el contacto: ', error); // Manejo de errores
    }
  };

  // Filtramos los contactos según el término de búsqueda
  const filteredContactos = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || // Búsqueda por nombre
    contacto.ocupacion.toLowerCase().includes(searchTerm.toLowerCase()) // Búsqueda por ocupación
  );

  // Variables para calcular la paginación
  const indexOfLastItem = currentPage * itemsPerPage; // Índice del último elemento en la página actual
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Índice del primer elemento en la página actual
  const currentItems = filteredContactos.slice(indexOfFirstItem, indexOfLastItem); // Elementos a mostrar en la página actual

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <Cabe /> {/* Componente de la cabecera */}
      <div className="p-6">
        {/* Contenedor de búsqueda y botón de agregar */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="text" // Campo de entrada para buscar contactos
            placeholder="Buscar por nombre u ocupación..."
            value={searchTerm} // Valor controlado por el estado searchTerm
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el estado al cambiar el valor
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleButtonClick} // Redirige al formulario de agregar contacto
            className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold hover:bg-green-500 transition"
          >
            Agregar contacto
          </button>
        </div>

        {/* Tabla estilizada */}
        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Edad</th>
                <th className="px-4 py-2">Género</th>
                <th className="px-4 py-2">Correo</th>
                <th className="px-4 py-2">Número</th>
                <th className="px-4 py-2">Ocupación</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Mostramos los contactos de la página actual */}
              {currentItems.map((contacto) => (
                <tr
                  key={contacto.id} // ID único del contacto
                  className="odd:bg-gray-100 even:bg-white hover:bg-gray-200 transition"
                >
                  <td className="px-4 py-2 text-center">{contacto.nombre}</td>
                  <td className="px-4 py-2 text-center">{contacto.edad}</td>
                  <td className="px-4 py-2 text-center">{contacto.genero}</td>
                  <td className="px-4 py-2 text-center">{contacto.correo}</td>
                  <td className="px-4 py-2 text-center">{contacto.numero}</td>
                  <td className="px-4 py-2 text-center">{contacto.ocupacion}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(contacto.id)} // Llama a la función para eliminar el contacto
                      className="bg-red-600 text-white px-3 py-1 rounded-md font-bold hover:bg-red-700 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-6 space-x-2">
          {/* Botones de paginación dinámicos */}
          {[...Array(Math.ceil(filteredContactos.length / itemsPerPage))].map((_, index) => (
            <button
              key={index} // Índice único del botón
              onClick={() => paginate(index + 1)} // Cambia a la página correspondiente
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-gray-500 transition"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Piep /> {/* Componente del pie de página */}
    </div>
  );
};

export default Contac; // Exportamos el componente
