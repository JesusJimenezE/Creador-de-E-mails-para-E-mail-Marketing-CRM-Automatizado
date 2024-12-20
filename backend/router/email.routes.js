const express = require('express');
const router = express.Router();

const controller = require('./../controllers/emailController');

router.post('/enviar-correo', controller.post)


module.exports = router;