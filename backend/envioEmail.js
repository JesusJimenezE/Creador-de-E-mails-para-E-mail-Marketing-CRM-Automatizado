const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar SendGrid con la clave API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Para parsear JSON en las solicitudes

// Endpoint para enviar correos
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const msg = {
    to,
    from: process.env.SENDER_EMAIL, // Define un correo autorizado por SendGrid
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).send('Correo enviado con éxito.');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).send('Error al enviar el correo.');
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
