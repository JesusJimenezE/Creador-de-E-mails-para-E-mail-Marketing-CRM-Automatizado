import React from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import styles from './Email.module.css'; // Importamos los estilos

export const Email = () => {
  return (
    <div>
      <Cabe />
    <div className={styles.EmailPage}> {/* Clase para centrar la página */}
      
        <div className={styles.FormContainer}> {/* Aplicamos la clase FormContainer aquí */}
          <Form>
            <FormGroup>
              <Label for="asunto">Asunto:</Label>
              <Input id="asunto" name="asunto" type="text" />
            </FormGroup>

            <FormGroup>
              <Label for="conte">Contenido:</Label>
              <Input id="conte" name="text" type="textarea" />
            </FormGroup>

            <FormGroup>
              <Label for="exampleSelect">Audiencia:</Label>
              <Input id="exampleSelect" name="select" type="select">
                <option>Genero</option>
                <option>Edad</option>
                <option>Ubicacion</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="exampleFile">Archivo:</Label>
              <Input id="exampleFile" name="file" type="file" />
            </FormGroup>

            <Button className={styles.env}>Enviar</Button>
            <Button className={styles.lim}>Limpiar</Button>
          </Form>
      </div>
      
    </div>
    <Piep />
    </div>
  );
};

export default Email;
