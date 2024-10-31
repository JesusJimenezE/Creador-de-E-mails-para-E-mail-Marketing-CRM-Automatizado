const { request } = require("express");
require('dotenv').config();

const express = require('express');
const sgMail = require('@sendgrid/mail');

// Configura la API Key de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());

// Ruta principal para verificar el estado del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al servidor de envío de correos'); // Muestra un mensaje al entrar a la ruta principal
});

// Define una ruta para enviar correos (POST /enviar-correo)
app.post('/enviar-correo', async (req, res) => {
  // Configura el mensaje de correo predeterminado
  const msg = {
    to: 'denissjimenez0622@gmail.com',  // Correo del destinatario
    from: 'jesusjimenez2620@gmail.com', // Correo del remitente (debe estar verificado en SendGrid)
    subject: 'Correo de prueba',
    text: 'Este es un mensaje de prueba',
    html: '<strong>Este es un mensaje de prueba enviado.</strong>',
  };

  try {
    // Envia el correo
    await sgMail.send(msg);
    res.status(200).json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ message: 'Error al enviar el correo.', error });
  }
});

// Configuración del puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
