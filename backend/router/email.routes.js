const express = require('express'); // Importa el módulo Express
const router = express.Router(); // Crea un enrutador de Express
const controller = require('../controllers/emailController'); // Importa el controlador

// Cambia `controller.post` por `controller.sendEmail`
router.post('/enviar-correo', controller.sendEmail);

module.exports = router; // Exporta el enrutador

