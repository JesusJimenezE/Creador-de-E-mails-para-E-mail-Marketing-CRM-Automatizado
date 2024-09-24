import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuepre.module.css';
import DENEDIG from './../assets/img/DENEDIGico.png';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importamos getAuth y createUserWithEmailAndPassword
import { useFirebaseApp } from 'reactfire';

export const Nuepre = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const firebase = useFirebaseApp();
    const auth = getAuth(firebase); // Obtenemos la instancia de auth desde Firebase

    const submitAgre = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("Usuario creado exitosamente");
            navigate('/login');
        } catch (error) {
            console.error("Error al crear usuario:", error);
        }
    };

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
                            <Label for="nombrep">Nombre:</Label>
                            <Input id="nombrep" name="nombre" type="text" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="correop">Correo:</Label>
                            <Input id="email" name="email" onChange={(ev) => setEmail(ev.target.value)} type="email" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numerop">Número telefónico:</Label>
                            <Input id="numerop" name="numero" type="tel" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contrasena">Contraseña:</Label>
                            <Input id="password" name="password" onChange={(ev) => setPassword(ev.target.value)} type="password" required />
                        </FormGroup>
                        <Button className={styles.agre} onClick={submitAgre}>Agregar</Button>
                        <Button className={styles.regr} onClick={handleSubmit}>Regresar</Button>
                    </Form>
                </div>
            </div>
            <Piep />
        </div>  
    );
}

export default Nuepre;
