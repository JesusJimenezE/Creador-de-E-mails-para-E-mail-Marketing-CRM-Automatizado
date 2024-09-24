import React from 'react';
import { Button } from 'reactstrap'; // Importamos el componente Button de Reactstrap para usar botones con estilo
import { Routes, Route, useNavigate } from 'react-router-dom'; // Importamos las herramientas de navegación y manejo de rutas
import styles from './App.css'; // Importamos los estilos de la aplicación
import inicabe from './assets/img/inicabe.png'; // Imagen para la parte superior
import DENEDIG from './assets/img/DENEDIGico.png'; // Logo de DENEDIG
import { Piep } from './components/Piep'; // Importamos el componente del pie de página
import Login from './screens/Login'; // Pantalla de inicio de sesión
import Home from './screens/Home'; // Pantalla de inicio
import Contac from './screens/Contac'; // Pantalla de contactos
import Email from './screens/Email'; // Pantalla de E-mail
import Prefil from './screens/Prefil'; // Pantalla del perfil
import Nuecont from './screens/Nuecont'; // Pantalla para agregar nuevo contacto
import Nuepre from './screens/Nuepre'; // Pantalla para agregar nuevo perfil
import Infcont from './screens/Infcont'; // Pantalla con información del contacto

function App() {
  const navigate = useNavigate(); // Hook para la navegación entre páginas

  // Función para redirigir a la página de login cuando se hace clic en el botón
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    // Definimos las rutas de la aplicación
    <Routes>
      {/* Ruta para la página principal (home) */}
      <Route
        path="/"
        element={
          <div className="App">
            {/* Imagen superior de la cabecera */}
            <img src={inicabe} alt="Parte de arriba" className="header-image" />
            <div>
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
      
      {/* Definimos las rutas para las diferentes páginas */}
      <Route path="/login" element={<Login />} /> {/* Ruta para la pantalla de login */}
      <Route path="/home" element={<Home />} /> {/* Ruta para la pantalla de inicio */}
      <Route path="/contac" element={<Contac />} /> {/* Ruta para la pantalla de contactos */}
      <Route path="/email" element={<Email />} /> {/* Ruta para la pantalla de emails */}
      <Route path="/perfil" element={<Prefil />} /> {/* Ruta para la pantalla de perfil */}
      <Route path="/nuecont" element={<Nuecont />} /> {/* Ruta para la pantalla de nuevo contacto */}
      <Route path="/app" element={<App />} /> {/* Ruta para volver a la app */}
      <Route path="/nuepre" element={<Nuepre />} /> {/* Ruta para la pantalla de nuevo perfil */}
      <Route path="/infcont" element={<Infcont />} /> {/* Ruta para la información de contacto */}
    </Routes>
  );
}

export default App; // Exportamos el componente App como predeterminado

