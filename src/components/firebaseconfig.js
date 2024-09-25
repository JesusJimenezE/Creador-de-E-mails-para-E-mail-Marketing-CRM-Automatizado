// Importa la función para inicializar Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMTYyxOljuNffBR7FlBxpY555w1PwrTMQ",
  authDomain: "emailcrm-697b1.firebaseapp.com",
  projectId: "emailcrm-697b1",
  storageBucket: "emailcrm-697b1.appspot.com",
  messagingSenderId: "71327977451",
  appId: "1:71327977451:web:d5d91a6c2d1b2129e6d3ae",
  measurementId: "G-7ZESFKB59K"
};

// Inicializa la aplicación de Firebase
const appFirebase = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(appFirebase);

// Exporta la instancia de Firebase y Firestore para usarlas en otros componentes
export { appFirebase, db };
