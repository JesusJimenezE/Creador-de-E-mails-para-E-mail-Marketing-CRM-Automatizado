import React from 'react';
import { Card as ReactstrapCard, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import styles from './CustomCard.module.css'; // Importa el archivo de estilos

export const CustomCard = () => {
    return (
        <div className={styles['card-container']}> {/* Aplica la clase del contenedor */}
            <ReactstrapCard className={styles['card']}> {/* Aplica la clase al card */}
                <CardBody>
                    <CardTitle tag="h5">
                        Contacto
                    </CardTitle>
                    <CardText>
                        Alguna información del contacto
                    </CardText>
                    <Button>
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
                    <Button>
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
                    <Button>
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
                    <Button>
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
                    <Button>
                        Ver más
                    </Button>
                </CardBody>
            </ReactstrapCard>
        </div>
    );
};
