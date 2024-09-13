import { Button } from 'reactstrap';
import './App.css';
import inicabe from './assets/img/inicabe.png';
import DENEDIG from './assets/img/DENEDIGico.png';
import { Piep } from './components/Piep';

function App() {
  return (
    <div className="App">
      <img src={inicabe} alt="Parte de ariba" className="header-image" />
      <div>
        <img src={DENEDIG} alt="Logo" className="logo-image" />
      </div>
      <div>"Bienvenido a la plataforma de E-mails"</div>
      <div>"DENEDIG SAD de CV"</div>
      <div>
        <Button color="primary">Iniciar sesión</Button>
      </div>
      <Piep/>
    </div>
  );
}

export default App;
