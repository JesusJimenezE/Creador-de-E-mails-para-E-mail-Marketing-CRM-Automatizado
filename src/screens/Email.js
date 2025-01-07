import React, { useEffect, useState } from 'react'; // Importa React y hooks useState y useEffect.
import { Cabe } from '../components/Cabe'; // Importa el componente de cabecera.
import { Piep } from '../components/Piep'; // Importa el componente de pie de página.
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importa componentes de Reactstrap para la UI.
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore'; // Importa funciones de Firebase Firestore.
import { db } from './../components/firebaseconfig'; // Importa la configuración de Firebase.
import { getAuth } from 'firebase/auth'; // Importa la función para obtener el usuario autenticado.

export const Email = () => {
  // Define los estados locales del componente para almacenar la información del formulario.
  const [genero, setGenero] = useState(''); // Género seleccionado.
  const [edad, setEdad] = useState({ min: '', max: '' }); // Rango de edad.
  const [ocupacion, setOcupacion] = useState(''); // Ocupación seleccionada.
  const [ocupacionesDisponibles, setOcupacionesDisponibles] = useState([]); // Lista de ocupaciones disponibles.
  const [asunto, setAsunto] = useState(''); // Asunto del correo.
  const [contenido, setContenido] = useState(''); // Contenido del correo.
  const [archivo, setArchivo] = useState(null); // Archivo adjunto.
  const [cargando, setCargando] = useState(false); // Estado de carga para mostrar cuando se está enviando el correo.

  // useEffect se ejecuta cuando el componente se monta, obtiene las ocupaciones disponibles de Firestore.
  useEffect(() => {
    const obtenerOcupaciones = async () => {
      const ocupaciones = [];
      const q = query(collection(db, 'contactos')); // Consulta para obtener todos los contactos.
      const querySnapshot = await getDocs(q); // Obtiene los documentos.

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.ocupacion && !ocupaciones.includes(data.ocupacion)) {
          ocupaciones.push(data.ocupacion); // Añade ocupaciones únicas.
        }
      });

      setOcupacionesDisponibles(ocupaciones); // Actualiza el estado con las ocupaciones disponibles.
    };

    obtenerOcupaciones();
  }, []); // Dependencias vacías, solo se ejecuta una vez cuando el componente se monta.

  // Función para limpiar el formulario y resetear los estados.
  const limpiarFormulario = () => {
    setGenero('');
    setEdad({ min: '', max: '' });
    setOcupacion('');
    setAsunto('');
    setContenido('');
    setArchivo(null);
  };

  // Función para convertir un archivo a base64, usada para enviar archivos adjuntos en el correo.
  const convertirArchivoABase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // Extrae la parte base64 del archivo.
      reader.onerror = (error) => reject(error); // Maneja errores.
      reader.readAsDataURL(archivo); // Lee el archivo como Data URL.
    });
  };

  // Función para registrar el envío de un correo en Firestore.
  const registrarEnvio = async ({ destinatario, asunto, contenido, adjunto }) => {
    try {
      const auth = getAuth(); // Obtiene el objeto de autenticación.
      const usuarioAutenticado = auth.currentUser; // Obtiene el usuario autenticado.

      if (!usuarioAutenticado) {
        throw new Error('No hay un usuario autenticado.'); // Lanza un error si no hay usuario autenticado.
      }

      // Añade un nuevo documento en la colección 'envios' en Firestore con la información del correo.
      await addDoc(collection(db, 'envios'), {
        remitente: usuarioAutenticado.email,
        destinatario,
        asunto,
        contenido,
        adjunto: adjunto ? true : false,
        fecha: new Date().toISOString().split('T')[0], // Formato de fecha YYYY-MM-DD.
      });
    } catch (error) {
      console.error('Error al registrar el envío en Firebase:', error); // Maneja errores al registrar el envío.
    }
  };

  // Función para enviar los correos a los destinatarios.
  const EnvioEmails = async (correo) => {
    try {
      const archivoBase64 = archivo ? await convertirArchivoABase64(archivo) : null; // Convierte el archivo a base64 si existe.

      // Realiza una solicitud POST al servidor para enviar el correo.
      const response = await fetch('https://creador-de-e-mails-para-e-mail-marketing.onrender.com/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: correo,
          subject: asunto,
          text: contenido,
          templateId: 'd-bf33b512e5d1446596460967f0ca5dda',
          fileContent: archivoBase64,
          fileName: archivo ? archivo.name : '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error('Error al enviar el correo: ' + (errorData.message || response.statusText)); // Maneja errores de la solicitud.
      }

      alert(`Correo enviado a: ${correo}`); // Muestra una alerta cuando el correo se envía correctamente.
      await registrarEnvio({ destinatario: correo, asunto, contenido, adjunto: archivo }); // Registra el envío en Firestore.
    } catch (error) {
      console.error(error); // Maneja errores en el envío del correo.
      alert('Hubo un error al enviar el correo. Por favor intenta de nuevo.'); // Muestra un mensaje de error.
    }
  };

  // Función para buscar los correos que coinciden con los filtros aplicados (género, edad, ocupación).
  const buscarCorreos = async () => {
    if (!asunto || !contenido) {
      alert('Por favor, completa el asunto y el contenido del correo.'); // Verifica que los campos esenciales estén llenos.
      return;
    }

    setCargando(true); // Activa el estado de carga.
    try {
      const contactosRef = collection(db, 'contactos'); // Referencia a la colección de contactos.
      let filtros = []; // Array de filtros para la consulta.

      // Agrega filtros según el género y ocupación seleccionados.
      if (genero && genero !== 'Todos') filtros.push(where('genero', '==', genero));
      if (ocupacion && ocupacion !== 'Todos') filtros.push(where('ocupacion', '==', ocupacion));

      // Convierte los valores de edad mínima y máxima a enteros y agrega los filtros correspondientes.
      const minEdad = parseInt(edad.min) || 0;
      const maxEdad = parseInt(edad.max) || 100;

      if (edad.min) filtros.push(where('edad', '>=', minEdad));
      if (edad.max) filtros.push(where('edad', '<=', maxEdad));

      const q = filtros.length ? query(contactosRef, ...filtros) : query(contactosRef); // Aplica los filtros a la consulta.
      const querySnapshot = await getDocs(q); // Ejecuta la consulta.

      if (!querySnapshot.empty) {
        const correos = querySnapshot.docs.map((doc) => doc.data().correo); // Obtiene los correos de los documentos.
        await Promise.all(correos.map((correo) => EnvioEmails(correo))); // Envía el correo a todos los contactos.
      } else {
        alert('No se encontraron correos que coincidan con los filtros.'); // Muestra un mensaje si no hay resultados.
      }
    } catch (error) {
      console.error('Error al buscar correos:', error); // Maneja errores en la búsqueda de correos.
    } finally {
      setCargando(false); // Desactiva el estado de carga.
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabe /> {/* Muestra el componente de cabecera */}
      <div className="flex-grow bg-gray-100 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Enviar Correo</h2>
          <Form>
            {/* Formulario con campos de entrada para los filtros y datos del correo */}
            <FormGroup>
              <Label for="asunto">Asunto:</Label>
              <Input id="asunto" type="text" value={asunto} onChange={(e) => setAsunto(e.target.value)} />
            </FormGroup>

            <FormGroup>
              <Label for="genero">Género:</Label>
              <Input id="genero" type="select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="">Seleccione una opción</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otros">Otros</option>
                <option value="Todos">Todos</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="edad">Rango de Edad:</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input type="number" placeholder="Mínima" value={edad.min} onChange={(e) => setEdad({ ...edad, min: e.target.value })} />
                <Input type="number" placeholder="Máxima" value={edad.max} onChange={(e) => setEdad({ ...edad, max: e.target.value })} />
              </div>
            </FormGroup>

            <FormGroup>
              <Label for="ocupacion">Ocupación:</Label>
              <Input id="ocupacion" type="select" value={ocupacion} onChange={(e) => setOcupacion(e.target.value)}>
                <option value="">Seleccione una opción</option>
                {ocupacionesDisponibles.map((ocup, index) => (
                  <option key={index} value={ocup}>{ocup}</option>
                ))}
                <option value="Todos">Todos</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="contenido">Contenido:</Label>
              <Input id="contenido" type="textarea" value={contenido} onChange={(e) => setContenido(e.target.value)} />
            </FormGroup>

            <FormGroup>
              <Label for="archivo">Adjuntar Archivo:</Label>
              <Input id="archivo" type="file" onChange={(e) => setArchivo(e.target.files[0])} />
            </FormGroup>

            <div className="flex space-x-4">
              <Button onClick={buscarCorreos} disabled={cargando} className="!bg-blue-500 !text-white !py-2 !px-6 !rounded-md hover:!bg-blue-600 focus:!outline-none focus:!bg-blue-600 transition-colors duration-300">
                {cargando ? 'Enviando...' : 'Enviar'}
              </Button>
              <Button type="button" onClick={limpiarFormulario} className="!bg-red-600 !text-white !px-3 !py-1 !rounded-md font-bold hover:!bg-red-700 transition">
                Limpiar
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <Piep /> {/* Muestra el componente de pie de página */}
    </div>
  );
};

export default Email;
