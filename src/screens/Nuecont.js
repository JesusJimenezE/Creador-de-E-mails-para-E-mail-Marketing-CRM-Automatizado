import React, { useState } from 'react';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import styles from './Nuecont.module.css';
import { db } from '../components/firebaseconfig';  // Importa `db` desde firebaseconfig

import { collection, addDoc } from 'firebase/firestore';  // Importa solo lo necesario de Firestore

export const Nuecont = () => {
  // Valor inicial del formulario
  const valorInicial = {
    nombre: '',
    edad: '',
    genero: '',
    correo: '',
    numero: '',
    ocupacion: ''
  };

  // Estado para los valores del formulario
  const [user, setUser] = useState(valorInicial);

  // Función para capturar los inputs
  const capturarInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Función para guardar los datos en Firestore
  const guardarDatos = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'contactos'), {
        ...user
      });
      console.log("Datos guardados correctamente");
    } catch (error) {
      console.error("Error al guardar los datos:", error);
    }

    // Resetear el formulario
    setUser({ ...valorInicial });
  };

  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}

      <div className={styles.NuevoPage}>
        <div className={styles.FormContainer}>
          <Form onSubmit={guardarDatos}>
            {/* Campo para el nombre */}
            <FormGroup>
              <Label for="nombrec">Nombre:</Label>
              <Input id="nombrec" name="nombre" type="text" onChange={capturarInputs} value={user.nombre} />
            </FormGroup>

            {/* Campo para la edad */}
            <FormGroup>
              <Label for="edad">Edad:</Label>
              <Input id="edad" name="edad" type="number" onChange={capturarInputs} value={user.edad} />
            </FormGroup>

            {/* Selector para género */}
            <FormGroup>
              <Label for="genero">Género:</Label>
              <Input id="genero" name="genero" type="select" onChange={capturarInputs} value={user.genero}>
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otros">Otros</option>
              </Input>
            </FormGroup>

            {/* Campo para correo */}
            <FormGroup>
              <Label for="correoc">Correo:</Label>
              <Input id="correoc" name="correo" type="email" onChange={capturarInputs} value={user.correo} />
            </FormGroup>

            {/* Campo para número telefónico */}
            <FormGroup>
              <Label for="numeroc">Número telefónico:</Label>
              <Input id="numeroc" name="numero" type="number" onChange={capturarInputs} value={user.numero} />
            </FormGroup>

            {/* Campo para dirección */}
            <FormGroup>
              <Label for="ocupacion">Ocupación:</Label>
              <Input id="ocupacion" name="ocupacion" type="text" onChange={capturarInputs} value={user.ocupacion} />
            </FormGroup>

            {/* Botones para guardar */}
            <Button className={styles.guar} type="submit">Guardar</Button>
            <Button className={styles.lim} type="button" onClick={() => setUser({ ...valorInicial })}>Limpiar</Button>
          </Form>
        </div>
      </div>

      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Nuecont;
