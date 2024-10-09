import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuepre.module.css';
import DENEDIG from './../assets/img/DENEDIGico.png';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import { db } from '../components/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';

export const Nuepre = () => {
    const navigate = useNavigate();
    const firebase = useFirebaseApp();
    const auth = getAuth(firebase);

    const valorInicial = {
        nombre: '',
        correo: '',
        numero: '',
        contraseña: ''
    };

    const [user, setUser] = useState(valorInicial);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Actualizar el estado de `user` cuando cambian los inputs
    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Convertir número telefónico a tipo número antes de guardarlo
    const guardarDatos = async () => {
        try {
            // Convertir el número a número entero antes de guardarlo
            const numeroConvertido = parseInt(user.numero, 10);
            
            // Verificar si la conversión es correcta
            if (isNaN(numeroConvertido)) {
                console.error("El número telefónico no es válido");
                return;
            }

            await addDoc(collection(db, 'usuario'), {
                nombre: user.nombre,
                correo: email, // Agrega el correo al objeto que se guardará
                numero: numeroConvertido, // Guardar el número como entero
                contraseña: password // Agrega la contraseña al objeto que se guardará
            });
            console.log("Datos guardados correctamente");
        } catch (error) {
            console.error("Error al guardar los datos:", error);
        }

        // Resetear el formulario
        setUser({ ...valorInicial });
        setEmail('');
        setPassword('');
    };

    const submitAgre = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        if (user.nombre && email && user.numero && password) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Usuario creado exitosamente");

                // Guardar datos del usuario en Firestore
                await guardarDatos();
                alert("Perfil agregado exitosamente");
                navigate('/login');
            } catch (error) {
                console.error("Error al crear usuario:", error);
            }
        } else {
            console.log("Por favor, completa todos los campos.");
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
                    <Form onSubmit={submitAgre}>
                        <FormGroup>
                            <Label for="nombrep">Nombre:</Label>
                            <Input id="nombrep" name="nombre" type="text" onChange={capturarInputs} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="correop">Correo:</Label>
                            <Input id="email" name="correo" onChange={(ev) => setEmail(ev.target.value)} type="email" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numerop">Número telefónico:</Label>
                            <Input id="numerop" name="numero" onChange={capturarInputs} type="tel" required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contrasena">Contraseña:</Label>
                            <Input id="password" name="contraseña" placeholder="minimo 6 caracteres de longitud" onChange={(ev) => setPassword(ev.target.value)} type="password" required />
                        </FormGroup>
                        <Button className={styles.agre} type="submit">Agregar</Button>
                        <Button className={styles.regr} onClick={handleSubmit}>Regresar</Button>
                    </Form>
                </div>
            </div>
            <Piep />
        </div>
    );
}

export default Nuepre;
