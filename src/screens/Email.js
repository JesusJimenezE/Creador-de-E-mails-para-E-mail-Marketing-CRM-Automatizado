import React, { useEffect, useState } from 'react'; // Importamos React y los hooks useEffect y useState.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importamos componentes de Reactstrap para formularios y botones.
import { Cabe } from '../components/Cabe'; // Importamos la cabecera personalizada.
import { Piep } from '../components/Piep'; // Importamos el pie de página personalizado.
import styles from './Email.module.css'; // Importamos los estilos específicos para la página.
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importamos funciones de Firebase Firestore.
import { db } from './../components/firebaseconfig'; // Importamos la configuración de Firebase.

export const Email = () => { // Definimos el componente 'Email'.

  // Definimos los estados para manejar datos del formulario y la audiencia.
  const [genero, setGenero] = useState(''); // Estado para el género.
  const [edad, setEdad] = useState({ min: '', max: '' }); // Estado para el rango de edad.
  const [ocupacion, setOcupacion] = useState(''); // Estado para la ocupación seleccionada.
  const [ocupacionesDisponible, setOcupacionesDisponibles] = useState([]); // Estado para las ocupaciones disponibles.
  const [cargando, setCargando] = useState(false); // Estado para la carga.
  const [asunto, setAsunto] = useState(''); // Estado para el asunto del email.
  const [contenido, setContenido] = useState(''); // Estado para el contenido del email.

  // Efecto que carga las ocupaciones disponibles desde Firestore al montar el componente.
  useEffect(() => {
    const obtenerOcupaciones = async () => { 
      const ocupaciones = []; // Arreglo para almacenar las ocupaciones.
      const q = query(collection(db, 'contactos')); // Definimos la consulta a Firestore.
      const querySnapshot = await getDocs(q); // Ejecutamos la consulta.

      querySnapshot.forEach((doc) => { // Recorremos los documentos obtenidos.
        const data = doc.data(); // Obtenemos los datos del documento.
        if (data.ocupacion && !ocupaciones.includes(data.ocupacion)) { 
          ocupaciones.push(data.ocupacion); // Agregamos ocupaciones no repetidas.
        }
      });

      setOcupacionesDisponibles(ocupaciones); // Actualizamos el estado con las ocupaciones.
    };

    obtenerOcupaciones(); // Ejecutamos la función al cargar el componente.
  }, []); // El efecto se ejecuta una sola vez.

  // Función para enviar correos.
  const EnvioEmails = async (correo) => {
    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: correo, // Correo destinatario.
          subject: asunto, // Asunto del email.
          text: contenido, // Contenido del email.
        }),
      });

      if (!response.ok) { 
        const errorData = await response.json();
        throw new Error('Error al enviar el correo: ' + (errorData.message || response.statusText));
      }

      console.log(`Correo enviado a: ${correo}`); // Confirmación en consola.
    } catch (error) {
      console.error(error); // Mostramos el error en consola.
    }
  };

  // Función para buscar correos en Firestore aplicando los filtros seleccionados.
  const buscarCorreos = async () => {
    setCargando(true); // Activamos el estado de carga.
    try {
      const contactosRef = collection(db, 'contactos'); // Referencia a la colección de contactos.
      let filtros = []; // Array para almacenar los filtros.

      // Aplicamos filtros de género y ocupación si se seleccionaron.
      if (genero && genero !== 'Todos') filtros.push(where('genero', '==', genero));
      if (ocupacion && ocupacion !== 'Todos') filtros.push(where('ocupacion', '==', ocupacion));

      // Convertimos el rango de edad a números.
      const minEdad = parseInt(edad.min) || 0;
      const maxEdad = parseInt(edad.max) || 100;
      if (minEdad > maxEdad) { // Validamos que el rango sea correcto.
        console.error('Rango de edad inválido.');
        return; // Salimos si el rango es incorrecto.
      }

      if (edad.min) filtros.push(where('edad', '>=', minEdad));
      if (edad.max) filtros.push(where('edad', '<=', maxEdad));

      const q = filtros.length ? query(contactosRef, ...filtros) : query(contactosRef);
      const querySnapshot = await getDocs(q); 

      if (!querySnapshot.empty) {
        const correos = querySnapshot.docs.map((doc) => doc.data().correo); 
        await Promise.all(correos.map((correo) => EnvioEmails(correo)));
        console.log('Correos encontrados:', correos);
      } else {
        console.log('No se encontraron correos que coincidan con los filtros.');
      }
    } catch (error) {
      console.error('Error al buscar correos:', error); 
    } finally {
      setCargando(false); // Desactivamos el estado de carga.
    }
  };

  return (
    <div>
      <Cabe /> {/* Cabecera */}
      <div className={styles.EmailPage}>
        <div className={styles.FormContainer}>
          <Form>
            <FormGroup>
              <Label for="asunto">Asunto:</Label>
              <Input
                id="asunto" name="asunto" type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label for="genero">Género:</Label>
              <Input
                id="genero" name="genero" type="select" value={genero} onChange={(e) => setGenero(e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otros">Otros</option>
                <option value="Todos">Todos</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="edad">Rango de edad:</Label>
              <div>
                <Input
                  type="number" placeholder="Edad mínima" value={edad.min} onChange={(e) => setEdad({ ...edad, min: e.target.value })}
                />
                <Input
                  type="number" placeholder="Edad máxima" value={edad.max} onChange={(e) => setEdad({ ...edad, max: e.target.value })}
                />
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="ocupacion">Ocupación:</Label>
              <Input
                id="ocupacion" name="ocupacion" type="select" value={ocupacion} onChange={(e) => setOcupacion(e.target.value)}
              >
                <option value="">Seleccione una opción</option>
                {ocupacionesDisponible.map((ocup, index) => (
                  <option key={index} value={ocup}>{ocup}</option>
                ))}
                <option value="Todos">Todos</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="contenido">Contenido:</Label>
              <Input
                id="contenido" name="contenido" type="textarea" value={contenido}onChange={(e) => setContenido(e.target.value)}
              />
            </FormGroup>

            <Button onClick={buscarCorreos} disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar correos'}
            </Button>
          </Form>
        </div>
      </div>
      <Piep /> {/* Pie de página */}
    </div>
  );
};

export default Email; // Exportamos el componente.
