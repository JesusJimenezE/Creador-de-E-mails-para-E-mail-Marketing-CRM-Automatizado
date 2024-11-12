// Importamos los módulos necesarios
const express = require('express'); // Framework para crear el servidor de aplicaciones web
const cors = require('cors'); // Middleware que permite realizar solicitudes entre diferentes dominios (CORS)
const sgMail = require('@sendgrid/mail'); // Librería que facilita el envío de correos electrónicos usando la API de SendGrid

// Configuración de las variables de entorno
require('dotenv').config(); // Carga las variables de entorno definidas en el archivo .env para usar en el servidor

// Configura la API Key de SendGrid utilizando la clave guardada en el archivo .env
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Establece la API Key para poder interactuar con la API de SendGrid

// Inicializa la aplicación de Express
const app = express(); // Crea una instancia de la aplicación Express

// Habilita CORS para permitir solicitudes desde otros dominios (servidores)
app.use(cors()); // Este middleware permite solicitudes desde cualquier dominio, lo cual es útil para el frontend

// Middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON
app.use(express.json({ limit: '10mb' })); // Permite que el servidor pueda procesar las solicitudes que contengan datos JSON

// Ruta principal del servidor (GET /)
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de envío de correos'); // Responde con un mensaje de bienvenida al acceder a la raíz
});

// Define una ruta para el envío de correos (POST /enviar-correo)
app.post('/enviar-correo', async (req, res) => {
  // Extrae los datos enviados desde el frontend en el cuerpo de la solicitud
  const { to, templateId, subject, text, fileContent, fileName } = req.body;

  // Configura el mensaje de correo utilizando los datos extraídos del cuerpo de la solicitud
  const msg = {
    to,  // Dirección de correo del destinatario, proporcionada desde el frontend
    from: 'jesusjimenez2620@gmail.com',
    templateId, // ID de la plantilla de correo en SendGrid
    dynamic_template_data: {
      subject, // Envía el asunto como variable de la plantilla
      text,    // Envía el texto que reemplazará {{text}} en la plantilla
    },
    attachments: fileContent
      ? [
          {
            content: fileContent, // Contenido del archivo en Base64
            filename: fileName, // Nombre del archivo
            type: 'application/octet-stream', // Tipo MIME (puede cambiar según el tipo de archivo)
            disposition: 'attachment', // Define que es un adjunto
          },
        ]
      : [],
  };

  try {
    // Envía el correo utilizando la API de SendGrid
    await sgMail.send(msg); // La función send de sgMail envía el correo utilizando los datos configurados

    // Si el correo se envía correctamente, responde con un mensaje de éxito (código 200)
    res.status(200).json({ message: 'Correo enviado exitosamente.' });
    console.log('Asunto recibido:', subject);
    console.log('texto recibido:', text);
    console.log('plantilla recibida:', templateId);
  } catch (error) {
    // Si ocurre un error al enviar el correo, lo muestra en la consola
    console.error('Error al enviar el correo:', error);

    // Responde con un mensaje de error y el detalle del mismo (código 500)
    res.status(500).json({ message: 'Error al enviar el correo.', error });
  }
});

// Configuración del puerto en el que el servidor escuchará las solicitudes
const PORT = process.env.PORT || 5000; // Usa el puerto definido en las variables de entorno o el 5000 por defecto

// Hace que el servidor comience a escuchar en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`); // Muestra un mensaje en la consola cuando el servidor esté activo
});
