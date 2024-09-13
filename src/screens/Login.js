import React from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import styles from './Login.module.css';
import logo from './../assets/img/DENEDIGico.png';
import logi from './../assets/img/fonlogi.png';
import { Piep } from '../components/Piep';

const Login = () => {
  const navigate = useNavigate(); // Crea una instancia del hook useNavigate

  const handleSubmit = () => {
    navigate('/home'); // Redirige a la página de inicio
  };

  return (
    <div className={styles.container}>
      <div className={styles['logo-container']}>
        <img src={logo} alt="logo" className={styles['logo-image']} />
      </div>
      <div className={styles.logi}>
        <img src={logi} alt="enmedio" className={styles['logi-image']} />
        <div className={styles['form-container']}>
          <Form>
            <Label for="ini">Iniciar sesión</Label>
            <FormGroup>
              <Input id="email" name="email" placeholder="Email:" type="email" />
            </FormGroup>
            <FormGroup>
              <Input id="contrasena" name="contrasena" placeholder="Contraseña" type="password" />
            </FormGroup>
            <Button outline color="secondary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <Piep />
    </div>
  );
};

export default Login;
