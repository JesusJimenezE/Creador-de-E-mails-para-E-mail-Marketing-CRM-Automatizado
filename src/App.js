import React from 'react'; // Importa React para poder usarlo en el componente
import { Button } from 'reactstrap'; // Importa el componente Button de Reactstrap para usar botones con estilo
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importa las herramientas de navegación y manejo de rutas
import styles from './App.css'; // Importa los estilos de la aplicación
import inicabe from './assets/img/inicabe.png'; // Imagen para la parte superior
import DENEDIG from './assets/img/DENEDIGico.png'; // Logo de DENEDIG
import { Piep } from './components/Piep'; // Importa el componente del pie de página
import Login from './screens/Login'; // Pantalla de inicio de sesión
import Home from './screens/Home'; // Pantalla de inicio
import Contac from './screens/Contac'; // Pantalla de contactos
import Email from './screens/Email'; // Pantalla de E-mail
import Prefil from './screens/Prefil'; // Pantalla del perfil
import Nuecont from './screens/Nuecont'; // Pantalla para agregar nuevo contacto
import Nuepre from './screens/Nuepre'; // Pantalla para agregar nuevo perfil
import PrivateRoute from './components/PrivateRoute'; // Componente de protección de rutas
import Regisenvi from './screens/Regisenvi'; //Pantalla de correos enviados

import Asisten from './screens/asistencia/Asiste';
import Regispres from './screens/asistencia/Regispres';
import Tablasist from './screens/asistencia/Tablasist';


function App() { // Define el componente App
  const navigate = useNavigate(); // Hook para la navegación entre páginas

  // Función para redirigir a la página de login cuando se hace clic en el botón
  const handleLoginClick = () => {
    navigate('/login'); // Redirige a la ruta de login
  };

  return (
    <Routes> {/* Define las rutas de la aplicación */}
      {/* Ruta para la página principal (home) */}
      <Route
        path="/"
        element={
          <div className="App"> {/* Contenedor principal de la aplicación */}
            {/* Imagen superior de la cabecera */}
            <img src={inicabe} alt="Parte de arriba" className="header-image" />
            <div className="flex justify-center">
              {/* Logo de DENEDIG */}
              <img src={DENEDIG} alt="Logo" className="logo-image" />
            </div>

            {/* Mensajes de bienvenida */}
            <div>"Bienvenido a la plataforma de E-mails"</div>
            <div>"DENEDIG SAD de CV"</div>
            <div>
              {/* Botón para iniciar sesión */}
              <Button className={styles.iniapp} onClick={handleLoginClick}>Iniciar sesión</Button>
            </div>
            {/* Componente del pie de página */}
            <Piep />
          </div>
        }
      />

      {/* Ruta para la pantalla de login */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas por autenticación */}
      <Route path="/home" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/contac" element={
        <PrivateRoute>
          <Contac />
        </PrivateRoute>
      } />
      <Route path="/email" element={
        <PrivateRoute>
          <Email />
        </PrivateRoute>
      } />
      <Route path="/perfil" element={
        <PrivateRoute>
          <Prefil />
        </PrivateRoute>
      } />
      <Route path="/nuecont" element={
        <PrivateRoute>
          <Nuecont />
        </PrivateRoute>
      } />
      <Route path="/nuepre" element={
        <Nuepre /> // Ruta sin protección para agregar un nuevo perfil
      } />
      <Route path="/regisenvi" element={
        <PrivateRoute>
          <Regisenvi />
        </PrivateRoute>
      } />



      <Route path="/asist" element={
        <PrivateRoute>
          <Asisten />
        </PrivateRoute>
      } />

      <Route path="/tabl" element={
        <PrivateRoute>
          <Tablasist />
        </PrivateRoute>
      } />

      <Route path="/regisr" element={
        <PrivateRoute>
          <Regispres />
        </PrivateRoute>
      } />


    </Routes>


  );
}

export default App; // Exporta el componente App
