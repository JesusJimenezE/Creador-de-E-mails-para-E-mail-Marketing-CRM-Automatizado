import React, { useEffect, useState } from 'react'; // Importamos React y los hooks useEffect y useState.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para el formulario y los botones.
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera.
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página.
import styles from './Email.module.css'; // Importamos los estilos específicos de esta página desde un archivo CSS.
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importamos las funciones de Firebase Firestore para hacer consultas.
import { db } from './../components/firebaseconfig'; // Importamos la configuración de Firebase para acceder a la base de datos.
import EnvioEmails from './../components/envioEmails'; // Importamos la configuracion para mandar e-mail

export const Email = () => { // Definimos el componente Email.

  // Definimos los estados para manejar los datos del formulario y la audiencia seleccionada.
  const [genero, setGenero] = useState(''); // Estado para el género seleccionado.
  const [edad, setEdad] = useState({ min: '', max: '' }); // Estado para el rango de edad (mínimo y máximo).
  const [ocupacion, setOcupacion] = useState(''); // Estado para la ocupación seleccionada.
  const [ocupacionesDisponible, setOcupacionesDisponibles] = useState([]); // Estado para almacenar las ocupaciones disponibles desde Firebase.
  const [cargando, setCargando] = useState(false); // Estado de carga.
  const [asunto, setAsunto] = useState(''); // Estado para el asunto del correo
  const [contenido, setContenido] = useState(''); // Estado para el contenido del correo

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

  // Función para buscar correos en Firestore.
  const buscarCorreos = async () => {
    setCargando(true); // Activa el estado de carga para mostrar que se está procesando la búsqueda.
    try {
      // Referencia a la colección 'contactos' en Firestore.
      const contactosRef = collection(db, 'contactos');

      let filtros = []; // Array para almacenar los filtros aplicados en la consulta.

      // Si el género es diferente de 'Todos', se agrega un filtro por género.
      if (genero && genero !== 'Todos') {
        filtros.push(where('genero', '==', genero));
      }

      // Si la ocupación es diferente de 'Todos', se agrega un filtro por ocupación.
      if (ocupacion && ocupacion !== 'Todos') {
        filtros.push(where('ocupacion', '==', ocupacion));
      }

      // Convertimos los valores del rango de edad a números enteros.
      const minEdad = parseInt(edad.min) || 0; // Edad mínima, por defecto 0.
      const maxEdad = parseInt(edad.max) || 100; // Edad máxima, por defecto 100.

      // Validación para asegurarse de que la edad mínima no sea mayor que la máxima.
      if (minEdad > maxEdad) {
        console.error('Rango de edad inválido.'); // Muestra un error en consola.
        setCargando(false); // Desactiva el estado de carga.
        return; // Sale de la función para evitar una consulta inválida.
      }

      // Si se proporcionó una edad mínima, se agrega el filtro correspondiente.
      if (edad.min) filtros.push(where('edad', '>=', minEdad));
      // Si se proporcionó una edad máxima, se agrega el filtro correspondiente.
      if (edad.max) filtros.push(where('edad', '<=', maxEdad));

      // Construimos la consulta:
      // Si hay filtros, se aplica cada uno con '...filtros'; si no, se consulta toda la colección.
      const q = filtros.length ? query(contactosRef, ...filtros) : query(contactosRef);
      
      // Ejecuta la consulta y almacena el resultado.
      const querySnapshot = await getDocs(q);    

      // Verifica si hay resultados.
      if (!querySnapshot.empty) {
        const correos = []; 
        querySnapshot.forEach((doc) => {
          correos.push(doc.data().correo);
        });

        await Promise.all(correos.map(correo => EnvioEmails(correo, asunto, contenido)));
        console.log('Correos enviados correctamente');
        
      } else {
        // Si no se encontraron resultados, mostramos un mensaje en consola.
        console.log('No se encontraron resultados.');
      }
    } catch (error) {
      // En caso de error, lo mostramos en la consola.
      console.error('Error al buscar correos:', error);
    } finally {
      // Desactiva el estado de carga sin importar si la consulta fue exitosa o falló.
      setCargando(false);
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
              <Input id="asunto" name="asunto" type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
            </FormGroup>

            {/* Campo para seleccionar genero */}
            <FormGroup>
              <Label for="genero">Género:</Label>
              <Input id="genero" name="genero" type="select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otros">Otros</option>
                <option value="Todos">Todos</option>
              </Input>
            </FormGroup>

            {/* Campo para seleccionar edad */}
            <FormGroup>
              <Label for="edad">Rango de edad:</Label>
              <div>
                <input id="edad-min" name="edad-min" type="number" placeholder="Edad mínima" value={edad.min} onChange={(e) => setEdad({ ...edad, min: Number(e.target.value) })} />
                <input id="edad-max" name="edad-max" type="number" placeholder="Edad máxima" value={edad.max} onChange={(e) => setEdad({ ...edad, max: Number(e.target.value) })} />
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
                <option value="Todos">Todos</option>
              </Input>
            </FormGroup>

            {/* Campo para el contenido del email */}
            <FormGroup>
              <Label for="conte">Contenido:</Label>
              <Input id="conte" name="text" type="textarea"  value={contenido} onChange={(e) => setContenido(e.target.value)}/>
            </FormGroup>

            {/* Campo para subir un archivo adjunto */}
            <FormGroup>
              <Label for="exampleFile">Archivo:</Label>
              <Input id="exampleFile" name="file" type="file" />
            </FormGroup>

            {/* Botones para enviar el formulario y limpiar los campos */}
            <Button className={styles.env}  onClick={(e) => {
                e.preventDefault(); // Prevenir la recarga de la página
                buscarCorreos(); // Llamar a la función para buscar y enviar correos
              }}>Enviar</Button>
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