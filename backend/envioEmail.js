const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const admin = require('firebase-admin');
require('dotenv').config(); 

// Inicializa Firebase Admin SDK con tus credenciales de servicio
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const app = express();
const PORT = process.env.PORT || 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


app.use(cors());
app.use(express.json());


const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token de autorización no proporcionado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido.', error: error.message });
  }
};


app.post('/send-email', verifyToken, async (req, res) => {
  const { to, subject, text } = req.body;
  const from = req.user.email;  

  const msg = {
    to,
    from,
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({
      message: 'Error al enviar el correo.',
      error: error.message,
    });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
