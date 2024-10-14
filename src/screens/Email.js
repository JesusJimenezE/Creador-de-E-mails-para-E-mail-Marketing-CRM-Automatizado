import React, { useEffect, useState } from 'react'; // Importamos React y los hooks useEffect y useState.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para el formulario y los botones.
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera.
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página.
import styles from './Email.module.css'; // Importamos los estilos específicos de esta página desde un archivo CSS.
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importamos las funciones de Firebase Firestore para hacer consultas.
import { db } from './../components/firebaseconfig'; // Importamos la configuración de Firebase para acceder a la base de datos.

export const Email = () => { // Definimos el componente Email.

  // Definimos los estados para manejar los datos del formulario y la audiencia seleccionada.
  const [audiencia, setAudiencia] = useState(''); // Estado para la audiencia seleccionada.
  const [genero, setGenero] = useState(''); // Estado para el género seleccionado.
  const [edad, setEdad] = useState({ min: '', max: '' }); // Estado para el rango de edad (mínimo y máximo).
  const [ocupacion, setOcupacion] = useState(''); // Estado para la ocupación seleccionada.
  const [ocupacionesDisponible, setOcupacionesDisponibles] = useState([]); // Estado para almacenar las ocupaciones disponibles desde Firebase.

  // useEffect para cargar las ocupaciones disponibles desde Firebase al cargar el componente.
  useEffect(() => {
    const obtenerOcupaciones = async () => { // Función asíncrona para obtener las ocupaciones.
      const ocupaciones = []; // Arreglo para almacenar ocupaciones.
      const q = query(collection(db, 'contactos')); // Consulta a la colección 'contactos'.
      const querySnapshot = await getDocs(q); // Ejecutamos la consulta y obtenemos los documentos.

      querySnapshot.forEach((doc) => { // Recorremos cada documento de la consulta.
        const data = doc.data(); // Obtenemos los datos del documento.
        if (data.ocupacion && !ocupaciones.includes(data.ocupacion)) { // Si el documento tiene una ocupación y no está en la lista.
          ocupaciones.push(data.ocupacion); // Añadimos la ocupación a la lista.
        }
      });

      setOcupacionesDisponibles(ocupaciones); // Actualizamos el estado con las ocupaciones disponibles.
    };
    obtenerOcupaciones(); // Ejecutamos la función al montar el componente.
  }, []); // El efecto se ejecuta solo una vez, cuando el componente se monta.

  // Función para manejar el cambio en la selección de audiencia (género, edad, ocupación).
  const handleSelectChange = (e) => {
    setAudiencia(e.target.value); // Actualizamos el estado de audiencia según la opción seleccionada.
  };

  // Función asíncrona para buscar correos en Firestore según el criterio seleccionado.
  const buscarCorreos = async () => {
    let q; // Variable para almacenar la consulta.

    // Crear la consulta dependiendo del criterio seleccionado.
    if (audiencia === 'genero') {
      q = query(collection(db, 'contactos'), where('genero', '==', genero)); // Filtrar por género.
    } else if (audiencia === 'edad') {
      const minEdad = parseInt(edad.min); // Convertir la edad mínima a número.
      const maxEdad = parseInt(edad.max); // Convertir la edad máxima a número.

      // Validar que los valores de edad mínima y máxima sean números.
      if (isNaN(minEdad) || isNaN(maxEdad)) {
        console.log('Por favor, ingresa un rango de edad válido.');
        return; // Detener la ejecución si la validación falla.
      }

      // Verificar que la edad mínima no sea mayor que la máxima.
      if (minEdad > maxEdad) {
        console.log('La edad mínima no puede ser mayor que la edad máxima.');
        return; // Detener la ejecución si la validación falla.
      }

      // Filtrar los contactos cuyo rango de edad esté dentro de los valores seleccionados.
      q = query(collection(db, 'contactos'), where('edad', '>=', minEdad), where('edad', '<=', maxEdad));
    } else if (audiencia === 'ocupacion') {
      q = query(collection(db, 'contactos'), where('ocupacion', '==', ocupacion)); // Filtrar por ocupación.
    }

    // Ejecutar la consulta solo si se ha definido una consulta.
    if (q) {
      const querySnapshot = await getDocs(q); // Ejecutamos la consulta y obtenemos los documentos.
      if (!querySnapshot.empty) { // Si hay resultados.
        querySnapshot.forEach((doc) => { // Recorremos cada documento del resultado.
          console.log('Correo:', doc.data().correo); // Imprimimos el correo del contacto en la consola.
        });
      } else {
        console.log('No se encontraron resultados para la audiencia seleccionada.'); // Mensaje si no hay resultados.
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

            {/* Campo para seleccionar genero */}
            <FormGroup>
                <Label for="genero">Género:</Label>
                <Input id="genero" name="genero" type="select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                  <option value="">Seleccione una opción</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otros">Otros</option>
                </Input>
              </FormGroup>

              {/* Campo para seleccionar edad */}
              <FormGroup>
                <Label for="edad">Rango de edad:</Label>
                <div>
                  <input id="edad-min" name="edad-min" type="number" placeholder="Edad mínima" value={edad.min} onChange={(e) => setEdad({ ...edad, min: e.target.value })} />
                  <input id="edad-max" name="edad-max" type="number" placeholder="Edad máxima" value={edad.max} onChange={(e) => setEdad({ ...edad, max: e.target.value })} />
                </div>
              </FormGroup>

              {/* Campo para seleccionar ocupacion */}
              <FormGroup>
                <label for="ocupacion">Ocupación</label>
                <Input id="ocupacion" name="ocupacion" type="select" value={ocupacion} onChange={(e) => setOcupacion(e.target.value)}>
                  <option value="">Seleccione una opción</option>
                  {ocupacionesDisponible.map((ocupacion, index) => (
                    <option key={index} value={ocupacion}>{ocupacion}</option>
                  ))}
                </Input>
              </FormGroup>

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

export default Email; // Exportamos el componente como predeterminado.
