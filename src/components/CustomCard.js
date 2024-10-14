import React, { useEffect, useState } from 'react';
import { Card as ReactstrapCard, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Importamos componentes de Reactstrap
import styles from './CustomCard.module.css'; // Importamos los estilos personalizados desde un archivo CSS
import { db } from '../components/firebaseconfig'; // Importamos la configuración de Firebase
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'; // Importamos métodos de Firestore para interactuar con la base de datos

// Componente CustomCard para mostrar contactos en tarjetas y permitir la eliminación de cada contacto
export const CustomCard = () => {
    const [contactos, setContactos] = useState([]); // Definimos el estado para almacenar los contactos obtenidos desde Firestore

    // useEffect para cargar los contactos cuando el componente se monta
    useEffect(() => {
        const cargarContactos = async () => {
            try {
                // Obtenemos los documentos de la colección 'contactos' en Firestore
                const querySnapshot = await getDocs(collection(db, 'contactos'));
                // Mapeamos los documentos obtenidos y los guardamos en el estado, agregando el ID a cada uno
                const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setContactos(datos); // Actualizamos el estado con los datos obtenidos
            } catch (error) {
                console.error('Error al obtener los datos de Firestore: ', error); // Capturamos y mostramos el error en la consola si ocurre
            }
        };

        cargarContactos(); // Llamamos a la función para cargar los contactos
    }, []); // El efecto se ejecuta una vez, cuando el componente se monta

    // Función para manejar la eliminación de un contacto
    const handleDelete = async (id) => {
        try {
            // Eliminamos el documento de Firestore que coincide con el ID proporcionado
            await deleteDoc(doc(db, 'contactos', id));
            // Actualizamos el estado, eliminando el contacto del array sin recargar la página
            setContactos(contactos.filter((contacto) => contacto.id !== id));

            // Mostramos una alerta confirmando la eliminación
            alert('Contacto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el contacto: ', error); // Capturamos y mostramos el error en la consola si ocurre
        }
    };

    return (
        // Contenedor principal de las tarjetas de contacto
        <div className={styles['card-container']}>
            {/* Iteramos sobre los contactos y renderizamos una tarjeta para cada uno */}
            {contactos.map((contacto) => (
                <ReactstrapCard key={contacto.id} className={styles['card']}>
                    <CardBody>
                        {/* Título de la tarjeta, que muestra el nombre del contacto */}
                        <CardTitle tag="h5">{contacto.nombre}</CardTitle>
                        <CardText>
                            {/* Información detallada del contacto: edad, género, correo, número y ocupación */}
                            <strong>Edad:</strong> {contacto.edad}<br />
                            <strong>Género:</strong> {contacto.genero}<br />
                            <strong>Correo:</strong> {contacto.correo}<br />
                            <strong>Número:</strong> {contacto.numero}<br />
                            <strong>Ocupación:</strong> {contacto.ocupacion}
                        </CardText>
                        {/* Botón para eliminar el contacto, al hacer clic llama a la función handleDelete */}
                        <Button className={styles.eliminar} onClick={() => handleDelete(contacto.id)}>
                            Eliminar
                        </Button>
                    </CardBody>
                </ReactstrapCard>
            ))}
        </div>
    );
};
