

module.exports= {
    
    post : (req, res) => {

        // Extrae los datos enviados desde el frontend en el cuerpo de la solicitud
          const { to, templateId, subject, text, fileContent, fileName } = req.body;
        
          // Configura el mensaje de correo utilizando los datos extraídos del cuerpo de la solicitud
          const msg = {
            to,  // Dirección de correo del destinatario, proporcionada desde el frontend
            from: 'maestriaennegociosdigitales@modelodenegocios.com', // Dirección de correo del remitente
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

    }
}