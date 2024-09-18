import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuepre.module.css';
import DENEDIG from './../assets/img/DENEDIGico.png';

export const Nuepre = () => {

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/login');
    };

    return (
        <div>

            <img src={DENEDIG} alt="Logo" className="logo-image" />

            <div className={styles.NueprPage}>




                <div className={styles.FormContainer}>
                    <Form>
                        <FormGroup>
                            <Label for="asunto">Nombre:</Label>
                            <Input id="nombrep" name="nombre" type="text" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="conte">Correo:</Label>
                            <Input id="correop" name="correo" type="email" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="conte">Numero telefonico:</Label>
                            <Input id="numerop" name="numero" type="number" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="conte">Contraseña:</Label>
                            <Input id="contrasena" name="contrasena" type="password" />
                        </FormGroup>

                        <Button className={styles.agre}>Agregar</Button>

                        <Button className={styles.regr} onClick={handleSubmit}>
                            Regresar
                        </Button>
                    </Form>
                </div>
            </div>
            <Piep />
        </div>
    );
}

export default Nuepre;
