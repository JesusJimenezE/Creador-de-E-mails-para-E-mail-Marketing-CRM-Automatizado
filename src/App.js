import React from 'react';
import { Button } from 'reactstrap';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import './App.css';
import inicabe from './assets/img/inicabe.png';
import DENEDIG from './assets/img/DENEDIGico.png';
import { Piep } from './components/Piep';
import Login from './screens/Login'; 
import Home from './screens/Home'; // Importa el componente Home

function App() {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <Routes> 
      <Route
        path="/"
        element={
          <div className="App">
            <img src={inicabe} alt="Parte de arriba" className="header-image" />
            <div>
              <img src={DENEDIG} alt="Logo" className="logo-image" />
            </div>
            <div>"Bienvenido a la plataforma de E-mails"</div>
            <div>"DENEDIG SAD de CV"</div>
            <div>
              <Button color="primary" onClick={handleLoginClick}>Iniciar sesión</Button>
            </div>
            <Piep />
          </div>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> {/* Añade la ruta para Home */}
    </Routes>
  );
}

export default App;
