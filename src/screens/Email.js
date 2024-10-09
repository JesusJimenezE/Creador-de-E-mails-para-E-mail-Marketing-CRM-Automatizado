import React, { useState } from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos los componentes necesarios de Reactstrap
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import styles from './Email.module.css'; // Importamos los estilos específicos para esta página
import { collection, query, where, getDocs } from 'firebase/firestore'; //Importamos unas herramientas de firebase
import { db } from './../components/firebaseconfig' //Importamos la configuracion para acceder a nuestra base de datos de firebase

export const Email = () => {

  // Estado para la opción seleccionada

  const [audiencia, setAudiencia] = useState('');
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState({ min: '', max: '' });
  const [ocupacion, setOcupacion] = useState('');

  // Función para manejar el cambio de selección de audiencia
  const handleSelectChange = (e) => {
    setAudiencia(e.target.value)
  };

  // Función para realizar la búsqueda en Firestore
  const buscarCorreos = async () => {
    let q;

    // Crear consulta dependiendo del criterio seleccionado
    if (audiencia === 'genero') {

      q = query(collection(db, 'contactos'), where('genero', '==', genero));

    } else if (audiencia === 'edad') {

      // Verificar que los valores de edad mínima y máxima estén completos y sean válidos
      const minEdad = parseInt(edad.min);
      const maxEdad = parseInt(edad.max);

      if (isNaN(minEdad) || isNaN(maxEdad)) {
        console.log('Por favor, ingresa un rango de edad válido.');
        return;
      }

      // Asegurarse de que el rango de edad sea lógico
      if (minEdad > maxEdad) {
        console.log('La edad mínima no puede ser mayor que la edad máxima.');
        return;
      }

      q = query(collection(db, 'contactos'), where('edad', '>=', minEdad), where('edad', '<=', maxEdad));

    } else if (audiencia === 'ocupacion') {

      q = query(collection(db, 'contactos'), where('ocupacion', '==', ocupacion));

    }

    // Ejecutar la consulta
    if (q) {

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {

        // Mostrar los correos de los contactos en la consola
        querySnapshot.forEach((doc) => {
          console.log('Correo:', doc.data().correo);
        });

      } else{

        console.log('No se encontraron resultados para la audiencia seleccionada.');
      }
    }
  };


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
              <Input id="exampleSelect" name="select" type="select" value={audiencia} onChange={handleSelectChange}>
                <option value="">Seleccione una opción</option>
                <option value="genero" >Genero</option>
                <option value="edad" >Edad</option>
                <option value="ocupacion" >Ocupación</option>
              </Input>
            </FormGroup>

            {/* Campos condicionales dependiendo de la audiencia que escogimos */}

            {audiencia === 'genero' && (

              <FormGroup>
                <Label for="genero">Género:</Label>
                <Input id="genero" name="genero" type="select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otros">Otros</option>
                </Input>
              </FormGroup>

            )}

            {audiencia === 'edad' && (

              <FormGroup>
                <Label for="edad">Rango de edad:</Label>
                <div className=''>
                <input id="edad-min" name="edad-min" type="number" placeholder="Edad mínima" value={edad.min} onChange={(e) => setEdad({ ...edad, min: e.target.value })} />
                <input id="edad-max" name="edad-max" type="number" placeholder="Edad máxima" value={edad.max} onChange={(e) => setEdad({ ...edad, max: e.target.value })} />
                </div>
              </FormGroup>

            )}

            {audiencia === 'ocupacion' && (

              <FormGroup>
                <label for="ocupacion">Ocupación</label>
                <Input id='ocupacion' name='ocupacion' type='text' value={ocupacion} onChange={(e) => setOcupacion(e.target.value)} />
              </FormGroup>

            )}

            {/* Campo para subir un archivo adjunto */}
            <FormGroup>
              <Label for="exampleFile">Archivo:</Label>
              <Input id="exampleFile" name="file" type="file" />
            </FormGroup>

            {/* Botones para enviar el formulario y limpiar los campos */}
            <Button className={styles.env} onClick={buscarCorreos}>Enviar</Button>
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
