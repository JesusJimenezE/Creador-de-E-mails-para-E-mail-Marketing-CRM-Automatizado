const express = require('express'); // Importa el módulo de Express, un framework para crear aplicaciones web y APIs en Node.js
const cors = require('cors'); // Importa el módulo de CORS, que permite solicitudes entre diferentes dominios (Cross-Origin Resource Sharing)
const emailRoutes = require('./routes/emailRoutes'); // Importa las rutas definidas para manejar solicitudes relacionadas con correos electrónicos
const app = express(); // Crea una instancia de la aplicación Express


app.use(cors()); // Middleware para habilitar CORS y permitir solicitudes desde otros dominios
app.use(express.json({ limit: '10mb' })); // Middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON con un tamaño máximo de 10MB

// Monta las rutas relacionadas con correos electrónicos en la ruta base '/api'
// Esto significa que cualquier solicitud a '/api' será manejada por las rutas definidas en emailRoutes
app.use('/api', emailRoutes);

// Define el puerto en el que el servidor escuchará las solicitudes
// Usa el puerto definido en las variables de entorno (process.env.PORT) o el 5000 por defecto
const PORT = process.env.PORT || 5000;

// Inicia el servidor y hace que escuche en el puerto especificado
// Cuando el servidor está listo, muestra un mensaje en la consola con la URL del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
