// Importamos los módulos necesarios
const express = require('express');
const cors = require('cors'); // Permite solicitudes desde otros dominios (CORS)
const sgMail = require('@sendgrid/mail'); // Importa SendGrid para envío de correos

// Configuración de las variables de entorno
require('dotenv').config();

// Configura la API Key de SendGrid desde el archivo .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Inicializa la aplicación de Express
const app = express();

// Habilita CORS para permitir solicitudes de diferentes dominios
app.use(cors());

// Middleware para permitir que el servidor reciba datos en formato JSON
app.use(express.json());

// Ruta principal para verificar el estado del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de envío de correos'); // Muestra un mensaje al acceder a la ruta principal
});

// Define una ruta para el envío de correos (POST /enviar-correo)
app.post('/enviar-correo', async (req, res) => {
  // Extrae los datos enviados desde el frontend en la solicitud
  const { to, subject, text } = req.body;

  // Configura el mensaje de correo con los datos recibidos
  const msg = {
    to,  // Correo del destinatario, obtenido desde el frontend
    from: 'jesusjimenez2620@gmail.com', // Correo del remitente (verificado en SendGrid)
    subject, // Asunto del correo
    text, // Contenido en texto plano
    html: `<strong>${text}</strong>`, // Contenido en formato HTML, opcionalmente el mismo texto en negrita
  };

  try {
    // Envía el correo utilizando SendGrid
    await sgMail.send(msg);
    res.status(200).json({ message: 'Correo enviado exitosamente.' }); // Responde con éxito
  } catch (error) {
    console.error('Error al enviar el correo:', error); // Muestra cualquier error en la consola
    res.status(500).json({ message: 'Error al enviar el correo.', error }); // Responde con error
  }
});

// Configuración del puerto en el que el servidor escuchará las solicitudes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`); // Muestra el puerto donde el servidor está activo
});
