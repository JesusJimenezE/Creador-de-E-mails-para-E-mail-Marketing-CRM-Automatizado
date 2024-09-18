import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuecont.module.css';
import DENEDIG from './../assets/img/DENEDIGico.png';

export const Nuepre = () => {

    const navigate = useNavigate(); // Usa el hook useNavigate

    const handleSubmit = () => {
        navigate('/login'); // Navega a la ruta '/login'
    };

    return (
        <div>
            <div className={styles.NueprPage}>
                <img src={DENEDIG} alt="Logo" className="logo-image" />

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

                        <Button className={styles.guar}>Agregar</Button>

                        <Button outline color="secondary" onClick={handleSubmit}>
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
