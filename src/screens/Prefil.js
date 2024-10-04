import React from 'react'; // Importa React
import { Cabe } from '../components/Cabe'; // Importa el componente Cabe
import { Piep } from '../components/Piep'; // Importa el componente Piep
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importa componentes de Reactstrap
import styles from './Prefil.module.css'; // Importa estilos CSS

export const Prefil = () => {
  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}

      <div className={styles.PrefPage}> {/* Clase para centrar la página */}
        
        <div className={styles.FormContainer}> {/* Aplicamos la clase FormContainer aquí */}
          <Form>
            <FormGroup>
              <Label for="nombre">Nombre:</Label> {/* Etiqueta para el campo de nombre */}
              <Input id="nombre" name="nombre" type="text" /> {/* Campo de entrada para nombre */}
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo:</Label> {/* Etiqueta para el campo de correo */}
              <Input id="correo" name="correo" type="email" /> {/* Campo de entrada para correo */}
            </FormGroup>

            <FormGroup>
              <Label for="numero">Número telefónico:</Label> {/* Etiqueta para el campo de número */}
              <Input id="numero" name="numero" type="number" /> {/* Campo de entrada para número */}
            </FormGroup>

            <FormGroup>
              <Label for="contraseña">Contraseña:</Label> {/* Etiqueta para el campo de contraseña */}
              <Input id="contraseña" name="contraseña" type="password" /> {/* Campo de entrada para contraseña */}
            </FormGroup>

            <Button className={styles.guar}>Guardar cambios</Button> {/* Botón para guardar cambios */}
          </Form>
        </div>
        
      </div>
      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Prefil; // Exporta el componente Prefil