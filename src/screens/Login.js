import React, { useState } from 'react'; // Importamos React y useState para manejar el estado.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para crear el formulario.
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para manejar la navegación entre páginas.
import styles from './Login.module.css'; // Importamos estilos específicos para esta página de inicio de sesión.
import logo from './../assets/img/DENEDIGico.png'; // Importamos el logo de la empresa.
import logi from './../assets/img/fonlogi.png'; // Importamos la imagen de fondo del login.
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página.

// Importa Firebase y los métodos específicos para la autenticación.
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Importa la configuración de Firebase desde firebaseconfig.js.
import { appFirebase } from '../components/firebaseconfig'; // Importamos la configuración de Firebase.

const Login = () => { // Definimos el componente Login.
  const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado.
  const [password, setPassword] = useState(''); // Estado para almacenar la contraseña ingresada.
  const navigate = useNavigate(); // Creamos una instancia de useNavigate para la navegación.
  const auth = getAuth(appFirebase); // Usamos appFirebase para obtener la instancia de autenticación.

  // Función para iniciar sesión.
  const login = async () => {
    try {
      // Intentamos iniciar sesión con el email y contraseña proporcionados.
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Redirigir a la página de inicio si la autenticación es exitosa.
    } catch (error) {
      // Manejo de errores en caso de fallo en la autenticación.
      console.error("Error al iniciar sesión:", error);
      alert("Error en el e-mail o contraseña"); // Mostrar alerta de error.
    }
  };

  // Función para redirigir a la página de registro.
  const handleSubmit1 = () => {
    navigate('/nuepre'); // Navegar a la página de registro.
  };

  return (
    <div className={styles.container}> {/* Contenedor principal del formulario de login */}
      <div className={styles['logo-container']}>
        <img src={logo} alt="logo" className={styles['logo-image']} /> {/* Logo de la empresa */}
      </div>
      <div className={styles.logi}>
        <img src={logi} alt="enmedio" className={styles['logi-image']} /> {/* Imagen de fondo del login */}
        <div className={styles['form-container']}> {/* Contenedor del formulario */}
          <Form>
            <Label for="ini">Iniciar sesión</Label> {/* Título del formulario */}
            <FormGroup>
              <Input 
                id="email" name="email" placeholder="Email" type="email" onChange={(ev) => setEmail(ev.target.value)}/> {/* Campo para el correo electrónico */}
            </FormGroup>
            <FormGroup>
              <Input 
                id="password" name="password" placeholder="Contraseña" type="password" onChange={(ev) => setPassword(ev.target.value)}  /> {/* Campo para la contraseña */}
            </FormGroup>
            <Button className={styles.inic} onClick={login}> {/* Botón para iniciar sesión */}
              Iniciar sesión
            </Button>
            <Button className={styles.regis} onClick={handleSubmit1}> {/* Botón para registrar */}
              Registrar
            </Button>
          </Form>
        </div>
      </div>
      <Piep /> {/* Componente del pie de página */}
    </div>
  );
};

export default Login; // Exportamos el componente Login como predeterminado.
