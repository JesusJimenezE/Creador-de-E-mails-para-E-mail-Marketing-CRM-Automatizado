import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para manejar la navegación
import { Piep } from '../components/Piep'; // Importa el componente Piep
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importa componentes de Reactstrap
import styles from './Nuepre.module.css'; // Importa estilos CSS específicos del componente
import DENEDIG from './../assets/img/DENEDIGico.png'; // Importa la imagen del logo

export const Nuepre = () => {
    const navigate = useNavigate(); // Inicializa useNavigate para redirigir

    // Maneja el evento de envío del formulario
    const handleSubmit = () => {
        navigate('/login'); // Redirige a la página de inicio de sesión
    };

    return (
        <div>
            <img src={DENEDIG} alt="Logo" className="logo-image" /> {/* Muestra el logo */}

            <div className={styles.NueprPage}> {/* Contenedor principal del formulario */}
                <div className={styles.FormContainer}> {/* Contenedor para el formulario */}
                    <Form>
                        <FormGroup>
                            <Label for="nombrep">Nombre:</Label> {/* Etiqueta para el campo de nombre */}
                            <Input id="nombrep" name="nombre" type="text" required /> {/* Campo de texto para el nombre */}
                        </FormGroup>

                        <FormGroup>
                            <Label for="correop">Correo:</Label> {/* Etiqueta para el campo de correo */}
                            <Input id="correop" name="correo" type="email" required /> {/* Campo de entrada para el correo */}
                        </FormGroup>

                        <FormGroup>
                            <Label for="numerop">Número telefónico:</Label> {/* Etiqueta para el campo de número telefónico */}
                            <Input id="numerop" name="numero" type="tel" required /> {/* Campo para el número de teléfono */}
                        </FormGroup>

                        <FormGroup>
                            <Label for="contrasena">Contraseña:</Label> {/* Etiqueta para el campo de contraseña */}
                            <Input id="contrasena" name="contrasena" type="password" required /> {/* Campo de entrada para la contraseña */}
                        </FormGroup>

                        <Button className={styles.agre}>Agregar</Button> {/* Botón para agregar */}
                        <Button className={styles.regr} onClick={handleSubmit}> {/* Botón para regresar */}
                            Regresar
                        </Button>
                    </Form>
                </div>
            </div>
            <Piep /> {/* Componente de pie de página */}
        </div>
    );
}

export default Nuepre; // Exporta el componente para su uso en otras partes de la aplicación
