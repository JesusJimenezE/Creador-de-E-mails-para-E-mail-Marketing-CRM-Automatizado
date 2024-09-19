import React from 'react';
import { Cabe } from '../components/Cabe'; 
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuecont.module.css'; 

export const Nuecont = () => {
  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}

      <div className={styles.NuevoPage}> 
        <div className={styles.FormContainer}> 
          <Form>
            {/* Campo para el nombre */}
            <FormGroup>
              <Label for="nombrec">Nombre:</Label>
              <Input id="nombrec" name="nombre" type="text" />
            </FormGroup>

            {/* Campo para la edad */}
            <FormGroup>
              <Label for="edad">Edad:</Label>
              <Input id="edad" name="edad" type="number" />
            </FormGroup>

            {/* Selector para género */}
            <FormGroup>
              <Label for="genero">Género:</Label>
              <Input id="genero" name="select" type="select">
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otros</option>
              </Input>
            </FormGroup>

            {/* Campo para correo */}
            <FormGroup>
              <Label for="correoc">Correo:</Label>
              <Input id="correoc" name="correo" type="email" />
            </FormGroup>

            {/* Campo para número telefónico */}
            <FormGroup>
              <Label for="numeroc">Número telefónico:</Label>
              <Input id="numeroc" name="numero" type="number" />
            </FormGroup>

            {/* Campo para dirección */}
            <FormGroup>
              <Label for="dirrecion">Dirección:</Label>
              <Input id="dirrecion" name="text" type="textarea" />
            </FormGroup>

            {/* Botones para guardar y limpiar */}
            <Button className={styles.guar}>Guardar</Button>
            <Button className={styles.lim}>Limpiar</Button>
          </Form>
        </div>
      </div>

      <Piep /> {/* Componente de pie de página */}
    </div>
  );
}

export default Nuecont;
