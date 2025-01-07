const express = require('express'); // Importa el módulo Express, que se utiliza para crear y gestionar rutas en la aplicación
const router = express.Router(); // Crea una instancia del enrutador de Express para definir rutas de manera modular
const controller = require('./../controllers/emailController'); // Importa el controlador que contiene la lógica para manejar las solicitudes relacionadas con el envío de correos

// Define una ruta POST 
router.post('/enviar-correo', controller.post);

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros archivos de la aplicación
