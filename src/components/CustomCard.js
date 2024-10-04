import React, { useEffect, useState } from 'react';
import { Card as ReactstrapCard, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styles from './CustomCard.module.css';
import { db } from '../components/firebaseconfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export const CustomCard = () => {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        const cargarContactos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'contactos'));
                const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setContactos(datos);
            } catch (error) {
                console.error('Error al obtener los datos de Firestore: ', error);
            }
        };

        cargarContactos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'contactos', id));
            setContactos(contactos.filter((contacto) => contacto.id !== id));
            
            // Muestra la alerta de confirmación
            alert('Contacto eliminado exitosamente');
        } catch (error) {
            console.error('Error al eliminar el contacto: ', error);
        }
    };

    return (
        <div className={styles['card-container']}>
            {contactos.map((contacto) => (
                <ReactstrapCard key={contacto.id} className={styles['card']}>
                    <CardBody>
                        <CardTitle tag="h5">{contacto.nombre}</CardTitle>
                        <CardText>
                            <strong>Edad:</strong> {contacto.edad}<br />
                            <strong>Género:</strong> {contacto.genero}<br />
                            <strong>Correo:</strong> {contacto.correo}<br />
                            <strong>Número:</strong> {contacto.numero}<br />
                            <strong>Ocupación:</strong> {contacto.ocupacion}
                        </CardText> 
                        <Button className={styles.eliminar} onClick={() => handleDelete(contacto.id)}>
                            Eliminar
                        </Button>
                    </CardBody>
                </ReactstrapCard>
            ))}
        </div>
    );
};
