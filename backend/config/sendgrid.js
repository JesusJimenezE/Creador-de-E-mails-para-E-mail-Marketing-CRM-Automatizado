const sgMail = require('@sendgrid/mail'); // Importa el módulo de SendGrid Mail, que permite enviar correos electrónicos a través de su API

sgMail.setApiKey('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'); // Establece la API Key para poder interactuar con la API de SendGrid

module.exports = sgMail; // Exporta el objeto `sgMail` para que pueda ser utilizado en otras partes de la aplicación
