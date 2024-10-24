import React, { useState } from 'react'; // Importamos React y useState para manejar el estado.
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para navegar entre páginas.
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para crear el formulario.
import styles from './Nuepre.module.css'; // Importamos estilos específicos para esta página.
import DENEDIG from './../assets/img/DENEDIGico.png'; // Importamos el logo de la aplicación.
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; // Importamos funciones de autenticación de Firebase.
import { useFirebaseApp } from 'reactfire'; // Importamos el hook para obtener la aplicación Firebase.
import { db } from '../components/firebaseconfig'; // Importamos la configuración de Firestore.
import { collection, addDoc } from 'firebase/firestore'; // Importamos métodos para manejar colecciones y documentos en Firestore.

export const Nuepre = () => { // Definimos el componente Nuepre.
    const navigate = useNavigate(); // Creamos una instancia de useNavigate.
    const firebase = useFirebaseApp(); // Obtenemos la instancia de la aplicación Firebase.
    const auth = getAuth(firebase); // Obtenemos la instancia de autenticación.

    // Valor inicial del formulario.
    const valorInicial = {
        nombre: '',
        correo: '',
        numero: '',
        contraseña: ''
    };

    // Estado para los valores del formulario.
    const [user, setUser] = useState(valorInicial); // Estado del usuario.
    const [email, setEmail] = useState(''); // Estado para el correo electrónico.
    const [password, setPassword] = useState(''); // Estado para la contraseña.

    // Actualizar el estado de `user` cuando cambian los inputs.
    const capturarInputs = (e) => {
        const { name, value } = e.target; // Obtenemos el nombre y el valor del input.
        setUser((prevState) => ({
            ...prevState,
            [name]: value // Actualizamos el estado con el nuevo valor del input.
        }));
    };

    // Función para guardar los datos en Firestore.
    const guardarDatos = async () => {
        try {
            // Convertir el número a número entero antes de guardarlo.
            const numeroConvertido = parseInt(user.numero, 10);
            
            // Verificar si la conversión es correcta.
            if (isNaN(numeroConvertido)) {
                console.error("El número telefónico no es válido");
                return; // Si no es un número válido, salimos de la función.
            }

            // Guardamos el documento en Firestore.
            await addDoc(collection(db, 'usuario'), {
                nombre: user.nombre, // Guardamos el nombre del usuario.
                correo: email, // Agregamos el correo al objeto que se guardará.
                numero: numeroConvertido, // Guardamos el número como entero.
                contraseña: password // Agregamos la contraseña al objeto que se guardará.
            });
            console.log("Datos guardados correctamente");
        } catch (error) {
            console.error("Error al guardar los datos:", error); // Mostramos un error si ocurre un fallo.
        }

        // Resetear el formulario después de agregar los datos.
        setUser({ ...valorInicial });
        setEmail(''); // Reseteamos el estado del correo.
        setPassword(''); // Reseteamos el estado de la contraseña.
    };

    // Función para manejar el envío del formulario.
    const submitAgre = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario.
        // Comprobar si todos los campos están llenos.
        if (user.nombre && email && user.numero && password) {
            try {
                // Crear un nuevo usuario en Firebase.
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Usuario creado exitosamente");

                // Guardar datos del usuario en Firestore.
                await guardarDatos(); // Llamamos a guardarDatos para almacenar el usuario.
                alert("Perfil agregado exitosamente");
                navigate('/login'); // Redirigimos a la página de login.
            } catch (error) {
                console.error("Error al crear usuario:", error); // Mostramos un error si ocurre un fallo en la creación del usuario.
            }
        } else {
            console.log("Por favor, completa todos los campos."); // Mensaje si falta información.
        }
    };

    // Función para regresar a la página de inicio de sesión.
    const handleSubmit = () => {
        navigate('/login'); // Redirigimos a la página de login.
    };

    return (
        <div>
            <img src={DENEDIG} alt="Logo" className="logo-image" /> {/* Mostramos el logo de la aplicación */}
            <div className={styles.NueprPage}> {/* Contenedor para la página de nuevo perfil */}
                <div className={styles.FormContainer}> {/* Contenedor del formulario */}
                    <Form onSubmit={submitAgre}> {/* Asignamos la función submitAgre al evento onSubmit */}
                        <FormGroup>
                            <Label for="nombrep">Nombre:</Label>
                            <Input 
                                id="nombrep" name="nombre" type="text" 
                                onChange={capturarInputs} // Maneja cambios en el input
                                required // Hace que el campo sea obligatorio
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="correop">Correo:</Label>
                            <Input 
                                id="email" 
                                name="correo" onChange={(ev) => setEmail(ev.target.value)} // Maneja cambios en el input de correo
                                type="email"  required // Hace que el campo sea obligatorio
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numerop">Número telefónico:</Label>
                            <Input 
                                id="numerop" name="numero" onChange={capturarInputs} // Maneja cambios en el input
                                type="tel"  required // Hace que el campo sea obligatorio
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="contrasena">Contraseña:</Label>
                            <Input 
                                id="password" 
                                name="contraseña" 
                                placeholder="mínimo 6 caracteres de longitud" 
                                onChange={(ev) => setPassword(ev.target.value)} // Maneja cambios en el input de contraseña
                                type="password" 
                                required // Hace que el campo sea obligatorio
                            />
                        </FormGroup>
                        <Button className={styles.agre} type="submit">Agregar</Button> {/* Botón para agregar el nuevo perfil */}
                        <Button className={styles.regr} onClick={handleSubmit}>Regresar</Button> {/* Botón para regresar a login */}
                    </Form>
                </div>
            </div>
            <Piep /> {/* Componente del pie de página */}
        </div>
    );
}

export default Nuepre; // Exportamos el componente Nuepre como predeterminado.
