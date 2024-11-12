import React, { useEffect, useState } from 'react';
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import styles from './Email.module.css';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './../components/firebaseconfig';

export const Email = () => {
  // Estados para manejar los valores del formulario y otros datos relevantes
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState({ min: '', max: '' });
  const [ocupacion, setOcupacion] = useState('');
  const [ocupacionesDisponible, setOcupacionesDisponibles] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [asunto, setAsunto] = useState('');
  const [contenido, setContenido] = useState('');
  const [archivo, setArchivo] = useState(null);

  // useEffect para cargar las ocupaciones desde Firestore cuando se monta el componente
  useEffect(() => {
    const obtenerOcupaciones = async () => {
      const ocupaciones = [];
      const q = query(collection(db, 'contactos'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.ocupacion && !ocupaciones.includes(data.ocupacion)) {
          ocupaciones.push(data.ocupacion); // Agrega ocupaciones únicas
        }
      });

      setOcupacionesDisponibles(ocupaciones); // Actualiza el estado con la lista de ocupaciones
    };

    obtenerOcupaciones(); // Llama a la función para obtener las ocupaciones
  }, []);

  // Convierte archivo a Base64 para enviarlo como adjunto
  const convertirArchivoABase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Elimina el prefijo de Base64
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(archivo);
    });
  };

  // Función para enviar correos electrónicos al servidor que procesará y enviará los correos mediante SendGrid
  const EnvioEmails = async (correo) => {
    try {

      const archivoBase64 = archivo ? await convertirArchivoABase64(archivo) : null;

      const response = await fetch('http://localhost:5000/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: correo, // Dirección del destinatario
          subject: asunto, // Asunto del correo, puedes seguir usándolo en los encabezados
          text: contenido, // El texto del correo, que también puede ir en la plantilla
          templateId: 'd-87fa19196a86427a83a7e38da17e5454', // ID de tu plantilla en SendGrid
          fileContent: archivoBase64,
          fileName: archivo ? archivo.name : '',

        }),

      });

      if (!response.ok) { // Si la respuesta no es exitosa, muestra un error
        const errorData = await response.json();
        throw new Error('Error al enviar el correo: ' + (errorData.message || response.statusText));
      }

      alert(`Correo enviado a: ${correo}`); // Muestra una alerta de éxito
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar el correo. Por favor intenta de nuevo.');
    }
  };

  // Función para buscar correos electrónicos en Firestore aplicando los filtros seleccionados
  const buscarCorreos = async () => {
    if (!asunto || !contenido) {
      alert('Por favor, completa el asunto y el contenido del correo.');
      return;
    }

    setCargando(true); // Muestra estado de carga mientras se buscan correos
    try {
      const contactosRef = collection(db, 'contactos');
      let filtros = []; // Arreglo de filtros para la consulta

      if (genero && genero !== 'Todos') filtros.push(where('genero', '==', genero));
      if (ocupacion && ocupacion !== 'Todos') filtros.push(where('ocupacion', '==', ocupacion));

      const minEdad = parseInt(edad.min) || 0;
      const maxEdad = parseInt(edad.max) || 100;
      if (minEdad > maxEdad) {
        console.error('Rango de edad inválido.');
        return;
      }

      if (edad.min) filtros.push(where('edad', '>=', minEdad));
      if (edad.max) filtros.push(where('edad', '<=', maxEdad));

      const q = filtros.length ? query(contactosRef, ...filtros) : query(contactosRef);
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const correos = querySnapshot.docs.map((doc) => doc.data().correo); // Extrae los correos electrónicos de los resultados
        await Promise.all(correos.map((correo) => EnvioEmails(correo)));
        console.log('Correos encontrados:', correos);
      } else {
        console.log('No se encontraron correos que coincidan con los filtros.');
      }
    } catch (error) {
      console.error('Error al buscar correos:', error);
    } finally {
      setCargando(false); // Oculta el estado de carga al finalizar la búsqueda
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

            <FormGroup>
              <Label for="archivo">Adjuntar Archivo:</Label>
              <Input id="archivo" name="archivo" type="file" onChange={(e) => setArchivo(e.target.files[0])} />
            </FormGroup>

            <Button onClick={buscarCorreos} disabled={cargando}>
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
