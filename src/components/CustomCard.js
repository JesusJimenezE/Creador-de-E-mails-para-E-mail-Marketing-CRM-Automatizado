import React, { useEffect, useState } from 'react';
import { Card as ReactstrapCard, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Importamos componentes de Reactstrap para el diseño de tarjetas
import styles from './CustomCard.module.css'; // Importamos estilos personalizados para la tarjeta desde un archivo CSS
import { db } from '../components/firebaseconfig'; // Importamos la configuración de Firebase
import { useNavigate } from 'react-router-dom'; // useNavigate para la navegación entre páginas
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Métodos de Firestore para leer y eliminar documentos

// Componente principal para mostrar tarjetas de contactos
export const CustomCard = () => {
    // Estado para almacenar los contactos obtenidos de Firestore
    const [contactos, setContactos] = useState([]);
    // Estado para rastrear la página actual en la paginación
    const [currentPage, setCurrentPage] = useState(1);
    // Número de contactos por página
    const itemsPerPage = 64;
    // Estado para el término de búsqueda en el input
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para controlar la visibilidad de detalles de cada tarjeta
    const [showDetails, setShowDetails] = useState({});

    const navigate = useNavigate(); // Para redirigir a otras rutas

    // Redirige a la página para agregar un nuevo contacto
    const handleButtonClick = () => {
        navigate('/nuecont');
    };

    // Carga los contactos desde Firestore cuando el componente se monta
    useEffect(() => {
        const cargarContactos = async () => {
            try {
                // Obtiene todos los documentos de la colección 'contactos' en Firestore
                const querySnapshot = await getDocs(collection(db, 'contactos'));
                // Mapea los documentos obtenidos, agregando el ID y guardándolos en el estado
                const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setContactos(datos);
            } catch (error) {
                console.error('Error al obtener los datos de Firestore: ', error); // Muestra el error si ocurre
            }
        };

        cargarContactos(); // Llama a la función para cargar los contactos
    }, []); // Se ejecuta solo una vez cuando el componente se monta

    // Elimina un contacto por su ID
    const handleDelete = async (id) => {
        try {
            // Elimina el documento de Firestore correspondiente al ID dado
            await deleteDoc(doc(db, 'contactos', id));
            // Actualiza el estado eliminando el contacto del array sin recargar la página
            setContactos(contactos.filter((contacto) => contacto.id !== id));
            alert('Contacto eliminado exitosamente'); // Mensaje de confirmación
        } catch (error) {
            console.error('Error al eliminar el contacto: ', error); // Muestra el error si ocurre
        }
    };

    // Alterna la visibilidad de los detalles de una tarjeta al hacer clic en ella
    const toggleDetails = (id) => {
        setShowDetails((prevDetails) => ({
            ...prevDetails,
            [id]: !prevDetails[id] // Cambia el valor booleano de `showDetails` para el contacto específico
        }));
    };

    // Filtra los contactos en función del término de búsqueda
    const filteredContactos = contactos.filter((contacto) =>
        contacto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contacto.ocupacion.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Cálculo de los índices para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Contactos actuales a mostrar en la página actual
    const currentItems = filteredContactos.slice(indexOfFirstItem, indexOfLastItem);

    // Cambia la página actual al hacer clic en un botón de paginación
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Contenedor de la barra de búsqueda y el botón "Agregar contacto" */}
            <div className={styles['search-container']}>
                {/* Input de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar por nombre u ocupación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                    className={styles.searchInput}
                />

                {/* Botón "Agregar contacto" */}
                <Button className={styles.agre} onClick={handleButtonClick}>
                    Agregar contacto
                </Button>
            </div>

            {/* Contenedor principal de las tarjetas de contacto */}
            <div className={styles['card-container']}>
                {/* Renderiza cada tarjeta en la página actual */}
                {currentItems.map((contacto) => (
                    <ReactstrapCard 
                        key={contacto.id} 
                        className={styles['card']}
                        onClick={() => toggleDetails(contacto.id)} // Alterna la visibilidad de los detalles
                    >
                        <CardBody>
                            {/* Título de la tarjeta: nombre del contacto */}
                            <CardTitle tag="h5">{contacto.nombre}</CardTitle>
                            {/* Condición para mostrar detalles adicionales solo si `showDetails` es true */}
                            {showDetails[contacto.id] && (
                                <CardText>
                                    <strong>Edad:</strong> {contacto.edad}<br />
                                    <strong>Género:</strong> {contacto.genero}<br />
                                    <strong>Correo:</strong> {contacto.correo}<br />
                                    <strong>Número:</strong> {contacto.numero}<br />
                                    <strong>Ocupación:</strong> {contacto.ocupacion}
                                </CardText>
                            )}
                            {/* Botón "Eliminar" */}
                            <Button className={styles.eliminar} onClick={(e) => {
                                e.stopPropagation(); // Evita que el clic en "Eliminar" active el evento de `onClick` en la tarjeta
                                handleDelete(contacto.id); // Llama a la función para eliminar el contacto
                            }}>
                                Eliminar
                            </Button>
                        </CardBody>
                    </ReactstrapCard>
                ))}
            </div>

            {/* Contenedor de paginación */}
            <div className={styles.pagination}>
                {/* Genera un botón por cada página */}
                {[...Array(Math.ceil(filteredContactos.length / itemsPerPage))].map((_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={styles.pageButton}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};
