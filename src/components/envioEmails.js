import sgMail from '@sendgrid/mail';
import { getAuth } from 'firebase/auth';
import { } from './firebaseconfig';

// clave API de SendGrid
sgMail.setApiKey(process.env.sendGridApiKey);

// Función para enviar correos
const EnvioEmails = async (to, subject, text) => {
  const auth = getAuth(); // Obtén la instancia de autenticación de Firebase
  const user = auth.currentUser; // Obtén el usuario autenticado

  if (!user) {
    throw new Error('No hay usuario autenticado.'); // Maneja el caso en que no hay usuario
  }

  const msg = {
    to, // Dirección de destino
    from: user.email, // Usa el correo del usuario autenticado como remitente
    subject,
    text,
  };

  try {
    await sgMail.send(msg); // Envía el mensaje
    console.log('Correo enviado'); // Log en consola
  } catch (error) {
    console.error('Error al enviar el correo:', error); // Maneja errores de envío
  }
};

export default EnvioEmails;
