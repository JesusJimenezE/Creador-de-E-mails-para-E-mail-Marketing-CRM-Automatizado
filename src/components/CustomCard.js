import React from 'react';
import { Card as ReactstrapCard, CardBody, CardTitle, CardText, Button } from 'reactstrap'; // Importamos los componentes de Reactstrap
import styles from './CustomCard.module.css'; // Importa el archivo de estilos personalizados
import { useNavigate } from 'react-router-dom'; // Hook para la navegación

export const CustomCard = () => {

    const navigate = useNavigate(); // Usamos el hook `useNavigate` para redireccionar a otras rutas

    // Función para manejar el evento al hacer clic en el botón
    const handleSubmit = () => {
      navigate('/infcont'); // Navega a la página de información de contacto
    };

    return (
        // Contenedor principal de todas las tarjetas, aplicamos la clase CSS correspondiente
        <div className={styles['card-container']}> 
            
            {/* Tarjeta individual con contenido de contacto */}
            <ReactstrapCard className={styles['card']}> 
                <CardBody>
                    <CardTitle tag="h5">
                        Contacto {/* Título de la tarjeta */}
                    </CardTitle>
                    <CardText>
                        Alguna información del contacto {/* Texto descriptivo dentro de la tarjeta */}
                    </CardText>
                    <Button className={styles.ver} onClick={handleSubmit}> {/* Botón que redirige a más información */}
                        Ver más
                    </Button>
                </CardBody>
            </ReactstrapCard>

            {/* Repetimos la estructura de la tarjeta para crear múltiples tarjetas */}
            <ReactstrapCard className={styles['card']}>
                <CardBody>
                    <CardTitle tag="h5">
                        Contacto
                    </CardTitle>
                    <CardText>
                        Alguna información del contacto
                    </CardText>
                    <Button className={styles.ver} onClick={handleSubmit}>
                        Ver más
                    </Button>
                </CardBody>
            </ReactstrapCard>

            <ReactstrapCard className={styles['card']}>
                <CardBody>
                    <CardTitle tag="h5">
                        Contacto
                    </CardTitle>
                    <CardText>
                        Alguna información del contacto
                    </CardText>
                    <Button className={styles.ver} onClick={handleSubmit}>
                        Ver más
                    </Button>
                </CardBody>
            </ReactstrapCard>

            <ReactstrapCard className={styles['card']}>
                <CardBody>
                    <CardTitle tag="h5">
                        Contacto
                    </CardTitle>
                    <CardText>
                        Alguna información del contacto
                    </CardText>
                    <Button className={styles.ver} onClick={handleSubmit}>
                        Ver más
                    </Button>
                </CardBody>
            </ReactstrapCard>

            <ReactstrapCard className={styles['card']}>
                <CardBody>
                    <CardTitle tag="h5">
                        Contacto
                    </CardTitle>
                    <CardText>
                        Alguna información del contacto
                    </CardText>
                    <Button className={styles.ver} onClick={handleSubmit}>
                        Ver más
                    </Button>
                </CardBody>
            </ReactstrapCard>

        </div>
    );
};

