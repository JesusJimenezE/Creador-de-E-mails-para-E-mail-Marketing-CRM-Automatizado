import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { firebaseappProvider } from 'reactfire'
import fireBaseConfig from './components/firebaseconfig'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <firebaseappProvider fireBaseConfig={}>
        <App />
      </firebaseappProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
