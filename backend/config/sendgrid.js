require('dotenv').config();  // Carga las variables de entorno desde un archivo .env

const sgMail = require('@sendgrid/mail');  // Importa el módulo de SendGrid Mail, que permite enviar correos electrónicos a través de su API

sgMail.setApiKey(process.env.SENDGRID_API_KEY);  // Establece la API Key utilizando una variable de entorno para mayor seguridad

module.exports = sgMail;  // Exporta el objeto `sgMail` para que pueda ser utilizado en otras partes de la aplicación