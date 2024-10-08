import React from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos los componentes necesarios de Reactstrap
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import styles from './Email.module.css'; // Importamos los estilos específicos para esta página

export const Email = () => {
  return (
    <div>
      {/* Componente de la cabecera */}
      <Cabe />

      {/* Contenedor principal de la página de envío de emails */}
      <div className={styles.EmailPage}>

        {/* Contenedor para el formulario */}
        <div className={styles.FormContainer}>
          <Form>
            {/* Campo de texto para el asunto del email */}
            <FormGroup>
              <Label for="asunto">Asunto:</Label>
              <Input id="asunto" name="asunto" type="text" />
            </FormGroup>

            {/* Campo para el contenido del email */}
            <FormGroup>
              <Label for="conte">Contenido:</Label>
              <Input id="conte" name="text" type="textarea" />
            </FormGroup>

            {/* Selector para elegir la audiencia */}
            <FormGroup>
              <Label for="exampleSelect">Audiencia:</Label>
              <Input id="exampleSelect" name="select" type="select">
                <option value="">Seleccione una opción</option>
                <option>Genero</option>
                <option>Edad</option>
                <option>Ocupación</option>
              </Input>
            </FormGroup>

            {/* Campo para subir un archivo adjunto */}
            <FormGroup>
              <Label for="exampleFile">Archivo:</Label>
              <Input id="exampleFile" name="file" type="file" />
            </FormGroup>

            {/* Botones para enviar el formulario y limpiar los campos */}
            <Button className={styles.env}>Enviar</Button>
            <Button className={styles.lim}>Limpiar</Button>
          </Form>
        </div>
      </div>

      {/* Componente del pie de página */}
      <Piep />
    </div>
  );
};

export default Email; // Exportamos el componente como predeterminado
