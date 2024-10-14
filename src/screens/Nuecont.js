import React, { useState } from 'react'; // Importamos React y useState para manejar el estado.
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera.
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para crear el formulario.
import styles from './Nuecont.module.css'; // Importamos estilos específicos para esta página.
import { db } from '../components/firebaseconfig';  // Importa `db` desde firebaseconfig para interactuar con Firestore.

import { collection, addDoc } from 'firebase/firestore';  // Importa solo los métodos necesarios de Firestore.

export const Nuecont = () => { // Definimos el componente Nuecont.
  // Valor inicial del formulario.
  const valorInicial = {
    nombre: '',
    edad: '',
    genero: '',
    correo: '',
    numero: '',
    ocupacion: ''
  };

  // Estado para los valores del formulario.
  const [user, setUser] = useState(valorInicial);

  // Función para capturar los inputs del formulario.
  const capturarInputs = (e) => {
    const { name, value } = e.target; // Obtenemos el nombre y el valor del input.
    setUser({ ...user, [name]: value }); // Actualizamos el estado del usuario con el nuevo valor.
  };

  // Función para guardar los datos en Firestore.
  const guardarDatos = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario.

    // Convertir los campos numéricos a números enteros.
    const datosConvertidos = {
      ...user,
      edad: parseInt(user.edad, 10),  // Convertir la edad a número entero.
      numero: parseInt(user.numero, 10) // Convertir el número a número entero.
    };

    try {
      // Intentar agregar el nuevo documento a la colección 'contactos'.
      await addDoc(collection(db, 'contactos'), datosConvertidos);
      alert("Contacto agregado exitosamente"); // Mostrar alerta si el contacto se agrega con éxito.
    } catch (error) {
      console.error("Error al guardar los datos:", error); // Mostrar error en la consola si ocurre un fallo.
    }

    // Resetear el formulario después de agregar los datos.
    setUser({ ...valorInicial });
  };

  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}

      <div className={styles.NuevoPage}> {/* Contenedor para la página de nuevo contacto */}
        <div className={styles.FormContainer}> {/* Contenedor del formulario */}
          <Form onSubmit={guardarDatos}> {/* Asignamos la función guardarDatos al evento onSubmit */}
            {/* Campo para el nombre */}
            <FormGroup>
              <Label for="nombrec">Nombre:</Label>
              <Input 
                id="nombrec" 
                name="nombre" 
                type="text" 
                onChange={capturarInputs} // Maneja cambios en el input
                value={user.nombre} // Valor del input vinculado al estado
              />
            </FormGroup>

            {/* Campo para la edad */}
            <FormGroup>
              <Label for="edad">Edad:</Label>
              <Input 
                id="edad" 
                name="edad" 
                type="number" 
                onChange={capturarInputs} // Maneja cambios en el input
                value={user.edad} // Valor del input vinculado al estado
              />
            </FormGroup>

            {/* Selector para género */}
            <FormGroup>
              <Label for="genero">Género:</Label>
              <Input 
                id="genero" 
                name="genero" 
                type="select" 
                onChange={capturarInputs} // Maneja cambios en el input
                value={user.genero} // Valor del input vinculado al estado
              >
                <option value="">Seleccione una opción</option> {/* Opción predeterminada */}
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otros">Otros</option>
              </Input>
            </FormGroup>

            {/* Campo para correo */}
            <FormGroup>
              <Label for="correoc">Correo:</Label>
              <Input 
                id="correoc" 
                name="correo" 
                type="email" 
                onChange={capturarInputs} // Maneja cambios en el input
                value={user.correo} // Valor del input vinculado al estado
              />
            </FormGroup>

            {/* Campo para número telefónico */}
            <FormGroup>
              <Label for="numeroc">Número telefónico:</Label>
              <Input 
                id="numeroc" 
                name="numero" 
                type="number" 
                onChange={capturarInputs} // Maneja cambios en el input
                value={user.numero} // Valor del input vinculado al estado
              />
            </FormGroup>

            {/* Campo para ocupación */}
            <FormGroup>
              <Label for="ocupacion">Ocupación:</Label>
              <Input 
                id="ocupacion" 
                name="ocupacion" 
                type="text" 
                onChange={capturarInputs} // Maneja cambios en el input
                value={user.ocupacion} // Valor del input vinculado al estado
              />
            </FormGroup>

            {/* Botones para guardar y limpiar */}
            <Button className={styles.guar} type="submit">Guardar</Button> {/* Botón para guardar */}
            <Button 
              className={styles.lim} 
              type="button" 
              onClick={() => setUser({ ...valorInicial })} // Limpiar los campos del formulario
            >
              Limpiar
            </Button>
          </Form>
        </div>
      </div>

      <Piep /> {/* Componente del pie de página */}
    </div>
  );
};

export default Nuecont; // Exportamos el componente Nuecont como predeterminado.
