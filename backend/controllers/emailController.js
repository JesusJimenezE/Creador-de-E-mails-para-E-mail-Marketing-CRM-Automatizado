// Importa el módulo de configuración de SendGrid, donde se encuentra la configuración para enviar correos
const sgMail = require('./../config/sendgrid');

// Define una función asíncrona para manejar el envío de correos electrónicos
const sendEmail = async (req, res) => {
  // Extrae los datos enviados en el cuerpo de la solicitud (req.body)
  const { to, templateId, subject, text, fileContent, fileName } = req.body;

  // Configura el mensaje de correo electrónico con los datos proporcionados
  const msg = {
    to, // Dirección del destinatario
    from: 'maestriaennegociosdigitales@modelodenegocios.com', // Dirección del remitente
    templateId, // ID de la plantilla de correo en SendGrid
    dynamic_template_data: { 
      subject, // Variable para el asunto del correo, usada en la plantilla
      text,    // Variable para el cuerpo del mensaje, usada en la plantilla
    },
    attachments: fileContent // Verifica si hay contenido para adjuntar
      ? [
          {
            content: fileContent, // Contenido del archivo en formato Base64
            filename: fileName,   // Nombre del archivo adjunto
            type: 'application/octet-stream', // Tipo MIME del archivo
            disposition: 'attachment', // Indica que el archivo es un adjunto
          },
        ]
      : [], // Si no hay contenido, no incluye adjuntos
  };

  try {
    // Intenta enviar el correo utilizando el método send de SendGrid
    await sgMail.send(msg);

    // Si el correo se envía con éxito, responde con un mensaje de éxito (código 200)
    res.status(200).json({ message: 'Correo enviado exitosamente.' });
  } catch (error) {
    // Si ocurre un error, lo registra en la consola para depuración
    console.error('Error al enviar el correo:', error);

    // Responde al cliente con un mensaje de error y el detalle del problema (código 500)
    res.status(500).json({ message: 'Error al enviar el correo.', error });
  }
};

// Exporta la función `sendEmail` para que pueda ser utilizada en otros módulos
module.exports = { sendEmail };
