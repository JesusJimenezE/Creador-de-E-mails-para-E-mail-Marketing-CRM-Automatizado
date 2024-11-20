import React, { useEffect, useState } from 'react'; // Importa React y los hooks useState y useEffect
import { Cabe } from '../components/Cabe'; // Componente de la cabecera
import { Piep } from '../components/Piep'; // Componente del pie de página
import { Table } from 'reactstrap'; // Componentes de Reactstrap para tabla y botones
import { db } from '../components/firebaseconfig'; // Configuración de Firebase
import { collection, getDocs } from 'firebase/firestore'; // Funciones de Firestore para obtener datos
import styles from './Regisenvi.module.css'; // Estilos personalizados para este componente

export const Regisenvi = () => {
    // Estado para almacenar los envíos obtenidos de Firebase
    const [envios, setEnvios] = useState([]);
    // Estado para manejar la página actual en la paginación
    const [currentPage, setCurrentPage] = useState(1);
    // Número de elementos a mostrar por página
    const itemsPerPage = 30;
    // Estado para el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');

    // Hook useEffect que se ejecuta al montar el componente para cargar los envíos desde Firestore
    useEffect(() => {
        const cargarEnvios = async () => {
            try {
                // Obtenemos todos los documentos de la colección 'envios' en Firebase
                const querySnapshot = await getDocs(collection(db, 'envios'));
                // Mapeamos los documentos y los guardamos en un array con su id
                const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setEnvios(datos); // Actualizamos el estado con los envíos obtenidos
            } catch (error) {
                console.error('Error al obtener los datos de Firestore: ', error); // Capturamos cualquier error al obtener los datos
            }
        };
        cargarEnvios(); // Llamamos a la función para cargar los datos de Firestore
    }, []); // Este efecto solo se ejecuta una vez al montar el componente

    // Filtrado de los envíos según el término de búsqueda (por remitente o asunto)
    const filteredEnvios = envios.filter((envio) =>
        envio.remitente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        envio.asunto.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Determinamos los índices para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Obtenemos los contactos de la página actual
  const currentItems = filteredEnvios.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página en la paginación
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Componente de la cabecera */}
            <Cabe />

            <div>
                {/* Barra de búsqueda */}
                <div className={styles['search-container']}>
                    <input
                        type="text"
                        placeholder="Buscar por remitente o asunto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el término de búsqueda
                        className={styles.searchInput}
                    />
                </div>

                {/* Tabla para mostrar los envíos */}
                <Table bordered hover className={styles['table-container']}>
                    <thead className={styles['table-header']}>
                        <tr>
                            {/* Cabeceras de la tabla */}
                            <th>Remitente</th>
                            <th>Destinatario</th>
                            <th>Asunto</th>
                            <th>Contenido</th>
                            <th>Archivo adjunto</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeamos y mostramos cada elemento de la lista de envíos filtrados */}
                        {currentItems.map((envio) => (
                            <tr key={envio.id} className={styles['table-row']}>
                                <td>{envio.remitente}</td>
                                <td>{envio.destinatario}</td>
                                <td>{envio.asunto}</td>
                                <td>{envio.contenido}</td>
                                <td>{envio.adjunto ? 'Sí' : 'No'}</td> {/* Muestra si hay archivo adjunto */}
                                <td>{new Date(envio.fecha).toLocaleDateString()}</td> {/* Formatea la fecha */}
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Componente de paginación */}
                <div className={styles.pagination}>
                    {/* Botones para navegar entre páginas */}
                    {[...Array(Math.ceil(filteredEnvios.length / itemsPerPage))].map((_, index) => (
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

export default Regisenvi;
