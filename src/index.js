import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire'; 
import { appFirebase } from './components/firebaseconfig'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FirebaseAppProvider firebaseApp={appFirebase}> 
        <Suspense fallback={'Conectando la app...'}>
          <App />
        </Suspense>
      </FirebaseAppProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
