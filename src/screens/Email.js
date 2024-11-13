import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { Cabe } from '../components/Cabe'; // Componente de cabecera
import { Piep } from '../components/Piep'; // Componente de pie de página
import styles from './Email.module.css'; // Estilos CSS específicos del módulo Email
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../components/firebaseconfig'; // Configuración de Firebase

export const Email = () => {
  // Estados para manejar los valores del formulario y otros datos
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState({ min: '', max: '' });
  const [ocupacion, setOcupacion] = useState('');
  const [ocupacionesDisponible, setOcupacionesDisponibles] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [contenido, setContenido] = useState('');
  const [archivo, setArchivo] = useState(null);

  // useEffect para cargar las ocupaciones desde Firestore al montar el componente
  useEffect(() => {
    const obtenerOcupaciones = async () => {
      const ocupaciones = [];
      const q = query(collection(db, 'contactos')); // Consulta de la colección "contactos"
      const querySnapshot = await getDocs(q);

      // Recorre cada documento en la colección
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.ocupacion && !ocupaciones.includes(data.ocupacion)) {
          ocupaciones.push(data.ocupacion); // Agrega ocupaciones únicas
        }
      });

      setOcupacionesDisponibles(ocupaciones); // Actualiza el estado con las ocupaciones obtenidas
    };

    obtenerOcupaciones(); // Llama a la función para obtener las ocupaciones
  }, []);

  // Convierte archivo a Base64 para adjuntarlo en el envío de correo
  const convertirArchivoABase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Elimina el prefijo de Base64
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(archivo);
    });
  };

  // Función para enviar correos electrónicos al servidor que usará SendGrid
  const EnvioEmails = async (correo) => {
    try {
      const archivoBase64 = archivo ? await convertirArchivoABase64(archivo) : null; // Convierte archivo si existe

      // Realiza la solicitud POST al servidor para enviar el correo
      const response = await fetch('http://localhost:5000/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: correo,
          subject: asunto,
          text: contenido,
          templateId: 'd-87fa19196a86427a83a7e38da17e5454', // ID de plantilla en SendGrid
          fileContent: archivoBase64,
          fileName: archivo ? archivo.name : '',
        }),
      });

      // Verifica si la solicitud fue exitosa
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Error al enviar el correo: ' + (errorData.message || response.statusText));
      }

      alert(`Correo enviado a: ${correo}`); // Muestra una alerta de éxito
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar el correo. Por favor intenta de nuevo.');
    }
  };

  // Función para buscar correos electrónicos en Firestore aplicando filtros
  const buscarCorreos = async () => {
    if (!asunto || !contenido) {
      alert('Por favor, completa el asunto y el contenido del correo.');
      return;
    }

    setCargando(true); // Muestra estado de carga durante la búsqueda
    try {
      const contactosRef = collection(db, 'contactos');
      let filtros = []; // Array de filtros para la consulta

      if (genero && genero !== 'Todos') filtros.push(where('genero', '==', genero));
      if (ocupacion && ocupacion !== 'Todos') filtros.push(where('ocupacion', '==', ocupacion));

      // Configura el rango de edad
      const minEdad = parseInt(edad.min) || 0;
      const maxEdad = parseInt(edad.max) || 100;
      if (minEdad > maxEdad) {
        console.error('Rango de edad inválido.');
        return;
      }

      if (edad.min) filtros.push(where('edad', '>=', minEdad));
      if (edad.max) filtros.push(where('edad', '<=', maxEdad));

      // Ejecuta la consulta en Firebase Firestore con los filtros aplicados
      const q = filtros.length ? query(contactosRef, ...filtros) : query(contactosRef);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Extrae los correos de los contactos encontrados
        const correos = querySnapshot.docs.map((doc) => doc.data().correo);
        await Promise.all(correos.map((correo) => EnvioEmails(correo))); // Envía correos en paralelo
        console.log('Correos encontrados:', correos);
      } else {
        console.log('No se encontraron correos que coincidan con los filtros.');
      }
    } catch (error) {
      console.error('Error al buscar correos:', error);
    } finally {
      setCargando(false); // Oculta el estado de carga al finalizar
    }
  };

  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}
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
              <div className={styles.edadContainer}> {/* Clase añadida para el contenedor */}
                <Input
                  type="number" placeholder="Edad mínima" value={edad.min} onChange={(e) => setEdad({ ...edad, min: e.target.value })}
                  className={styles.edadInput}  // Clase adicional para los inputs
                />
                <Input
                  type="number" placeholder="Edad máxima" value={edad.max} onChange={(e) => setEdad({ ...edad, max: e.target.value })}
                  className={styles.edadInput}  // Clase adicional para los inputs
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

            <FormGroup>
              <Label for="archivo">Adjuntar Archivo:</Label>
              <Input id="archivo" name="archivo" type="file" onChange={(e) => setArchivo(e.target.files[0])} />
            </FormGroup>

            <Button className={styles.env} onClick={buscarCorreos} disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar Correo'}
            </Button>
          </Form>
        </div>
      </div>
      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Email;
