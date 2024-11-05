import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import styles from './Email.module.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../components/firebaseconfig';

export const Email = () => {
  // Estados para almacenar y manejar los datos del formulario y la audiencia
  const [genero, setGenero] = useState(''); // Almacena el género seleccionado
  const [edad, setEdad] = useState({ min: '', max: '' }); // Almacena el rango de edad mínimo y máximo
  const [ocupacion, setOcupacion] = useState(''); // Almacena la ocupación seleccionada
  const [ocupacionesDisponible, setOcupacionesDisponibles] = useState([]); // Lista de ocupaciones disponibles
  const [cargando, setCargando] = useState(false); // Estado para indicar si se está enviando el correo
  const [asunto, setAsunto] = useState(''); // Almacena el asunto del correo
  const [contenido, setContenido] = useState(''); // Almacena el contenido del correo

  // useEffect para cargar las ocupaciones desde Firestore cuando el componente se monta
  useEffect(() => {
    const obtenerOcupaciones = async () => {
      const ocupaciones = []; // Array para almacenar las ocupaciones sin duplicados
      const q = query(collection(db, 'contactos')); // Definimos la consulta a la colección 'contactos'
      const querySnapshot = await getDocs(q); // Ejecutamos la consulta y obtenemos los resultados

      // Recorremos los documentos obtenidos de Firestore
      querySnapshot.forEach((doc) => {
        const data = doc.data(); // Obtenemos los datos de cada documento
        if (data.ocupacion && !ocupaciones.includes(data.ocupacion)) {
          ocupaciones.push(data.ocupacion); // Agregamos ocupaciones únicas al array
        }
      });

      setOcupacionesDisponibles(ocupaciones); // Guardamos las ocupaciones en el estado
    };

    obtenerOcupaciones(); // Ejecutamos la función
  }, []);

  // Función para enviar correos
  const EnvioEmails = async (correo) => {
    try {
      const response = await fetch('http://localhost:5000/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: correo, // Destinatario del correo
          subject: asunto, // Asunto del correo
          text: contenido, // Contenido del correo
        }),
      });

      if (!response.ok) { // Verifica si hubo un error en la respuesta
        const errorData = await response.json();
        throw new Error('Error al enviar el correo: ' + (errorData.message || response.statusText));
      }

      console.log(`Correo enviado a: ${correo}`); // Confirma el envío en la consola
    } catch (error) {
      console.error(error); // Muestra el error en la consola
    }
  };

  // Función para buscar correos en Firestore aplicando los filtros seleccionados
  const buscarCorreos = async () => {
    setCargando(true); // Activa el estado de carga
    try {
      const contactosRef = collection(db, 'contactos'); // Referencia a la colección 'contactos'
      let filtros = []; // Array para almacenar los filtros aplicados

      // Aplicar los filtros de género y ocupación si están seleccionados
      if (genero && genero !== 'Todos') filtros.push(where('genero', '==', genero));
      if (ocupacion && ocupacion !== 'Todos') filtros.push(where('ocupacion', '==', ocupacion));

      // Convertir las edades a números e implementar lógica de validación
      const minEdad = parseInt(edad.min) || 0;
      const maxEdad = parseInt(edad.max) || 100;
      if (minEdad > maxEdad) { // Verifica que el rango de edad sea válido
        console.error('Rango de edad inválido.');
        return; // Finaliza la función si el rango es inválido
      }

      // Aplicar los filtros de edad mínima y máxima
      if (edad.min) filtros.push(where('edad', '>=', minEdad));
      if (edad.max) filtros.push(where('edad', '<=', maxEdad));

      // Realizar la consulta con los filtros y obtener los correos
      const q = filtros.length ? query(contactosRef, ...filtros) : query(contactosRef);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) { // Si se encuentran resultados en la consulta
        const correos = querySnapshot.docs.map((doc) => doc.data().correo); // Obtener correos de los documentos
        await Promise.all(correos.map((correo) => EnvioEmails(correo))); // Enviar correo a cada destinatario
        console.log('Correos encontrados:', correos);
      } else {
        console.log('No se encontraron correos que coincidan con los filtros.');
      }
    } catch (error) {
      console.error('Error al buscar correos:', error); // Muestra el error en la consola
    } finally {
      setCargando(false); // Desactiva el estado de carga
    }
  };

  // Función para enviar un correo de prueba
  const enviarCorreoPrueba = async () => {
    try {
      const response = await fetch('http://localhost:5000/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'denissjimenez0622@gmail.com',
          subject: 'Prueba de envío desde botón',
          text: 'Este es un correo de prueba desde el botón de prueba por parte de Email.',
        }),
      });

      if (!response.ok) { // Verifica si hubo un error en la respuesta
        const errorData = await response.json();
        throw new Error('Error al enviar el correo de prueba: ' + (errorData.message || response.statusText));
      }

      alert('Correo de prueba enviado exitosamente.'); // Muestra una alerta de éxito
    } catch (error) {
      console.error(error); // Muestra el error en la consola
      alert('Error al enviar el correo de prueba.'); // Muestra una alerta de error
    }
  };

  return (
    <div>
      <Cabe /> {/* Cabecera personalizada */}
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
                id="contenido" name="contenido" type="textarea" value={contenido} onChange={(e) => setContenido(e.target.value)}
              />
            </FormGroup>

            <Button onClick={buscarCorreos} disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar Correo'}
            </Button>
          </Form>
        </div>
        <Button onClick={enviarCorreoPrueba}>Enviar Correo de Prueba</Button>
      </div>
      <Piep /> {/* Pie de página personalizado */}
    </div>
  );
};


export default Email;
