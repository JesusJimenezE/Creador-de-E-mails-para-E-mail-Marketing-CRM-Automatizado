import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire'; // Cambia a FirebaseAppProvider con mayúscula
import fireBaseConfig from './components/firebaseconfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FirebaseAppProvider firebaseConfig={fireBaseConfig}> {/* Capitalización corregida */}
        <App />
      </FirebaseAppProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
