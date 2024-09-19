import React from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para el formulario
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la navegación
import styles from './Login.module.css'; // Importamos estilos específicos para esta página
import logo from './../assets/img/DENEDIGico.png'; // Importamos el logo
import logi from './../assets/img/fonlogi.png'; // Importamos la imagen de fondo del login
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página

const Login = () => {
  const navigate = useNavigate(); // Creamos una instancia de useNavigate

  // Función para redirigir a la página de inicio
  const handleSubmit = () => {
    navigate('/home'); 
  };

  // Función para redirigir a la página de registro
  const handleSubmit1 = () => {
    navigate('/nuepre'); 
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
              <Input id="email" name="email" placeholder="Email:" type="email" /> {/* Campo para el correo electrónico */}
            </FormGroup>
            <FormGroup>
              <Input id="contrasena" name="contrasena" placeholder="Contraseña" type="password" /> {/* Campo para la contraseña */}
            </FormGroup>
            <Button className={styles.inic} onClick={handleSubmit}> {/* Botón para iniciar sesión */}
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

export default Login; // Exportamos el componente como predeterminado

