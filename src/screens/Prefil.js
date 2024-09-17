import React from 'react'
import { Cabe } from '../components/Cabe'; 
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Prefil.module.css';

export const Prefil = () => {
  return (
    <div>
    <Cabe />
  <div className={styles.PrefPage}> {/* Clase para centrar la página */}
    
      <div className={styles.FormContainer}> {/* Aplicamos la clase FormContainer aquí */}
        <Form>
          <FormGroup>
            <Label for="asunto">Nombre:</Label>
            <Input id="nombre" name="nombre" type="text" />
          </FormGroup>

          <FormGroup>
            <Label for="conte">Correo:</Label>
            <Input id="correo" name="correo" type="email" />
          </FormGroup>

          <FormGroup>
            <Label for="conte">Numero telefonico:</Label>
            <Input id="numero" name="numero" type="number" />
          </FormGroup>

          <FormGroup>
            <Label for="conte">Contraseña:</Label>
            <Input id="contraseña" name="contraseña" type="password" />
          </FormGroup>

          <Button className={styles.guar}>Guardar cambios</Button>
        </Form>
    </div>
    
  </div>
  <Piep />
  </div>
  )
}
export default Prefil;