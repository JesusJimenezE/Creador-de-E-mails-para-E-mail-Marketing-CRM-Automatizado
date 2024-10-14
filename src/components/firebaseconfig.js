// Importa la función para inicializar Firebase
import { initializeApp } from 'firebase/app';
// Importa la función para inicializar Firestore (base de datos en tiempo real de Firebase)
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase
// Este objeto contiene las credenciales únicas y detalles del proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAMTYyxOljuNffBR7FlBxpY555w1PwrTMQ",           // Clave de la API
  authDomain: "emailcrm-697b1.firebaseapp.com",               // Dominio para la autenticación
  projectId: "emailcrm-697b1",                                // ID del proyecto de Firebase
  storageBucket: "emailcrm-697b1.appspot.com",                // Bucket de almacenamiento
  messagingSenderId: "71327977451",                           // ID del remitente de mensajes
  appId: "1:71327977451:web:d5d91a6c2d1b2129e6d3ae",          // ID de la aplicación
  measurementId: "G-7ZESFKB59K"                               // ID de medición para Google Analytics
};

// Inicializa la aplicación de Firebase
// Usamos la función initializeApp para inicializar la app con la configuración proporcionada
const appFirebase = initializeApp(firebaseConfig);

// Inicializa Firestore
// Con getFirestore, conectamos la aplicación a la base de datos Firestore
const db = getFirestore(appFirebase);

// Exporta la instancia de Firebase y Firestore para usarlas en otros componentes
export { appFirebase, db };
