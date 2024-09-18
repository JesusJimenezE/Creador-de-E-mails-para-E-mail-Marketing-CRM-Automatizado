import React from 'react';
import { Button } from 'reactstrap';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import './App.css';
import inicabe from './assets/img/inicabe.png';
import DENEDIG from './assets/img/DENEDIGico.png';
import { Piep } from './components/Piep';
import Login from './screens/Login'; 
import Home from './screens/Home'; 
import Contac from './screens/Contac'; 
import Email from './screens/Email'; 
import Prefil from './screens/Prefil';
import Nuecont from './screens/Nuecont'; 
import Nuepre from './screens/Nuepre';

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
      <Route path="/home" element={<Home />} />
      <Route path="/contac" element={<Contac />} />
      <Route path="/email" element={<Email />} />
      <Route path="/perfil" element={<Prefil />} />
      <Route path="/nuecont" element={<Nuecont />} /> 
      <Route path="/app" element={<App />} />
      <Route path="/nuepre" element={<Nuepre />} />
    </Routes>
      
  );
}

export default App;
