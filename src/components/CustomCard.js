import React, { useEffect, useState } from 'react'; // Importa React y hooks
import { Card as ReactstrapCard, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Importa los componentes de Reactstrap
import styles from './CustomCard.module.css'; // Importa el archivo de estilos personalizados
import { useNavigate } from 'react-router-dom'; // Hook para la navegación
import { db } from '../components/firebaseconfig'; // Importa la instancia de Firestore
import { collection, getDocs } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore

export const CustomCard = () => {
    const [contactos, setContactos] = useState([]); // Estado para almacenar los datos de los contactos
    const navigate = useNavigate(); // Hook `useNavigate` para redirigir

    // useEffect para cargar los datos de la colección al montar el componente
    useEffect(() => {
        const cargarContactos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contactos')); // Obtén la colección de contactos
                const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Mapea los documentos
                setContactos(datos); // Almacena los datos en el estado
            } catch (error) {
                console.error('Error al obtener los datos de Firestore: ', error);
            }
        };

        cargarContactos(); // Ejecuta la función para cargar los datos
    }, []);

    // Función para manejar la navegación al hacer clic en "Ver más"
    const handleSubmit = (id) => {
        navigate(`/infcont/${id}`); // Navega a la página de información de contacto y pasa el id del contacto
    };

    return (
        <div className={styles['card-container']}>
            {/* Itera sobre los contactos y genera una tarjeta para cada uno */}
            {contactos.map((contacto) => (
                <ReactstrapCard key={contacto.id} className={styles['card']}>
                    <CardBody>
                        <CardTitle tag="h5">{contacto.nombre}</CardTitle> {/* Muestra el nombre del contacto */}
                        <CardText>
                            <strong>Edad:</strong> {contacto.edad}<br />
                            <strong>Género:</strong> {contacto.genero}<br />
                            <strong>Correo:</strong> {contacto.correo}<br />
                            <strong>Número:</strong> {contacto.numero}<br />
                            <strong>Dirección:</strong> {contacto.direccion}
                        </CardText> {/* Muestra el resto de la información del contacto */}
                        <Button className={styles.eliminar} onClick={() => handleSubmit(contacto.id)}> {/* Botón "Ver más" */}
                            Eliminar
                        </Button>
                    </CardBody>
                </ReactstrapCard>
            ))}
        </div>
    );
};
