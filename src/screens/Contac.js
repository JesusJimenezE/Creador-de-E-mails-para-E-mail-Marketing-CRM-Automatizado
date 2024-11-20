
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap'; // Usamos componentes de Reactstrap para estilizar la tabla y los botones
import { db } from '../components/firebaseconfig'; // Importamos la configuración de Firebase
import { useNavigate } from 'react-router-dom'; // Hook para redireccionar a otras rutas
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Funciones de Firestore para obtener y eliminar datos
import styles from './Contac.module.css'; // Importamos estilos personalizados desde un archivo CSS

export const Contac = () => {
  // Estado para almacenar los contactos obtenidos de Firebase
  const [contactos, setContactos] = useState([]);
  // Estado para la paginación, indicando la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Número de elementos a mostrar por página
  const itemsPerPage = 30;
  // Estado para almacenar el término de búsqueda ingresado por el usuario
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // Hook de navegación para redirigir entre rutas

  // Función que redirige a la página para agregar un nuevo contacto
  const handleButtonClick = () => {
    navigate('/nuecont');
  };

  // Hook de efecto que se ejecuta al montar el componente para cargar los contactos desde Firestore
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        // Obtenemos los documentos de la colección 'contactos'
        const querySnapshot = await getDocs(collection(db, 'contactos'));
        // Mapeamos los documentos a un array de objetos con id y datos de cada contacto
        const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setContactos(datos); // Guardamos los datos en el estado
      } catch (error) {
        console.error('Error al obtener los datos de Firestore: ', error);
      }
    };
    cargarContactos(); // Llamamos a la función de carga
  }, []);

  // Función para eliminar un contacto por su ID
  const handleDelete = async (id) => {
    try {
      // Eliminamos el documento de Firestore
      await deleteDoc(doc(db, 'contactos', id));
      // Actualizamos el estado para reflejar el cambio, filtrando el contacto eliminado
      setContactos(contactos.filter((contacto) => contacto.id !== id));
      alert('Contacto eliminado exitosamente'); // Mensaje de confirmación
    } catch (error) {
      console.error('Error al eliminar el contacto: ', error);
    }
  };

  // Filtramos los contactos según el término de búsqueda
  const filteredContactos = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contacto.ocupacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determinamos los índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Obtenemos los contactos de la página actual
  const currentItems = filteredContactos.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página en la paginación
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Componente de la cabecera */}
      <Cabe />

      {/* Tabla donde muestra los contactos */}
      <div>
            {/* Contenedor de búsqueda y botón de agregar */}
            <div className={styles['search-container']}>
                <input
                    type="text"
                    placeholder="Buscar por nombre u ocupación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el término de búsqueda
                    className={styles.searchInput}
                />
                <Button className={styles.agre} onClick={handleButtonClick}>
                    Agregar contacto
                </Button>
            </div>

            {/* Tabla estilizada para mostrar los contactos */}
            <Table bordered hover className={styles['table-container']}>
                <thead className={styles['table-header']}>
                    <tr>
                        <th>Nombre</th>
                        <th>Edad</th>
                        <th>Género</th>
                        <th>Correo</th>
                        <th>Número</th>
                        <th>Ocupación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Mapeamos y mostramos cada contacto en una fila */}
                    {currentItems.map((contacto) => (
                        <tr key={contacto.id} className={styles['table-row']}>
                            <td>{contacto.nombre}</td>
                            <td>{contacto.edad}</td>
                            <td>{contacto.genero}</td>
                            <td>{contacto.correo}</td>
                            <td>{contacto.numero}</td>
                            <td>{contacto.ocupacion}</td>
                            <td>
                                {/* Botón para eliminar el contacto */}
                                <Button className={styles['table-eliminar']} onClick={() => handleDelete(contacto.id)}>
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Componente de paginación */}
            <div className={styles.pagination}>
                {/* Botones para navegar entre páginas */}
                {[...Array(Math.ceil(filteredContactos.length / itemsPerPage))].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={styles.pageButton}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>

      {/* Componente del pie de página */}
      <Piep />
    </div>
  );
};

export default Contac; // Exportamos el componente como predeterminado
