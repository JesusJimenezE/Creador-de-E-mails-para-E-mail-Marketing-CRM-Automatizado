import React, { useState, useEffect } from 'react'; // Importa React y los hooks necesarios
import { Cabe } from '../components/Cabe'; // Importa el componente Cabe
import { Piep } from '../components/Piep'; // Importa el componente Piep
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importa componentes de Reactstrap
import styles from './Prefil.module.css'; // Importa estilos CSS específicos para este componente
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa funciones de Firebase Auth
import { db } from '../components/firebaseconfig'; // Importa la configuración de Firestore
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'; // Importa funciones para interactuar con Firestore

export const Prefil = () => { // Define el componente Prefil
  const [userDocId, setUserDocId] = useState(null); // Almacena el ID del documento del usuario
  const [formData, setFormData] = useState({ // Almacena los datos del formulario
    nombre: '',
    correo: '',
    numero: '',
    contraseña: '',
  });

  // Cargar la información del usuario autenticado al montar el componente
  useEffect(() => {
    const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase
    onAuthStateChanged(auth, async (currentUser) => { // Escucha cambios en el estado de autenticación
      if (currentUser) { // Si hay un usuario autenticado
        const email = currentUser.email; // Obtiene el correo del usuario autenticado

        // Realiza una consulta a Firestore para buscar el documento del usuario basado en el correo
        const q = query(collection(db, 'usuario'), where('correo', '==', email)); // Consulta en la colección 'usuario'
        const querySnapshot = await getDocs(q); // Obtiene los documentos que coinciden con la consulta
        
        if (!querySnapshot.empty) { // Si se encuentra al menos un documento
          // Si se encuentra el documento, carga los datos en el formulario
          const userDoc = querySnapshot.docs[0]; // Obtiene el primer documento encontrado
          const userData = userDoc.data(); // Obtiene los datos del documento
          setUserDocId(userDoc.id); // Guarda el ID del documento del usuario para actualizarlo después
          setFormData({
            nombre: userData.nombre || '', // Carga el nombre del usuario
            correo: email, // Usa el correo del usuario autenticado
            numero: userData.numero || '', // Carga el número del usuario
            contraseña: userData.contraseña || '', // Mantiene la contraseña solo para mostrar
          });
        } else {
          console.log('No se encontraron datos para este usuario.'); // Mensaje si no se encuentran datos
        }
      }
    });
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del input
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza el estado del formulario
  };

  // Guardar cambios en Firestore
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    if (userDocId) { // Verifica que se haya cargado el ID del documento
      try {
        // Convertir el número a un valor numérico
        const numeroConvertido = parseInt(formData.numero, 10); // Convierte el número a entero

        // Verificar si la conversión es correcta
        if (isNaN(numeroConvertido)) {
          console.error('El número telefónico no es válido'); // Muestra un error si el número no es válido
          return;
        }

        // Referencia al documento del usuario en Firestore
        const userDocRef = doc(db, 'usuario', userDocId); // Referencia al documento del usuario

        // Actualizar los campos 'nombre' y 'numero' en Firestore
        await updateDoc(userDocRef, {
          nombre: formData.nombre, // Actualiza el nombre del usuario
          numero: numeroConvertido,  // Guarda el número como entero
        });

        alert("Perfil editado correctamente"); // Muestra un mensaje de éxito
      } catch (error) {
        console.error('Error al actualizar los datos:', error); // Muestra un error si ocurre un fallo
      }
    }
  };

  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}
      <div className={styles.PrefPage}> {/* Contenedor para la página de perfil */}
        <div className={styles.FormContainer}> {/* Contenedor del formulario */}
          <Form onSubmit={handleSubmit}> {/* Asigna la función handleSubmit al evento onSubmit */}
            <FormGroup>
              <Label for="nombre">Nombre:</Label>
              <Input 
                id="nombre" 
                name="nombre" 
                type="text" 
                value={formData.nombre} // Muestra el valor del nombre en el input
                onChange={handleChange} // Maneja cambios en el input
              />
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo:</Label>
              <Input 
                id="correo" 
                name="correo" 
                type="email" 
                value={formData.correo} // Muestra el correo en el input
                onChange={handleChange} // Maneja cambios en el input
                disabled // El correo no debería cambiarse
              />
            </FormGroup>

            <FormGroup>
              <Label for="numero">Número telefónico:</Label>
              <Input 
                id="numero" 
                name="numero" 
                type="number" 
                value={formData.numero} // Muestra el número en el input
                onChange={handleChange} // Maneja cambios en el input
              />
            </FormGroup>

            <FormGroup>
              <Label for="contraseña">Contraseña:</Label>
              <Input 
                id="contraseña" 
                name="contraseña" 
                type="text" 
                value={formData.contraseña} // Muestra la contraseña en el input
                onChange={handleChange} // Maneja cambios en el input
                disabled // Deshabilitado por seguridad
              />
            </FormGroup>

            <Button className={styles.guar} type="submit">Guardar cambios</Button> {/* Botón para guardar cambios */}
          </Form>
        </div>
      </div>
      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Prefil; // Exporta el componente Prefil
