import React, { useState, useEffect } from 'react'; // Importa React y los hooks
import { Cabe } from '../components/Cabe'; // Importa el componente Cabe
import { Piep } from '../components/Piep'; // Importa el componente Piep
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importa componentes de Reactstrap
import styles from './Prefil.module.css'; // Importa estilos CSS
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa Firebase Auth
import { db } from '../components/firebaseconfig'; // Asegúrate de que db esté bien importado
import { collection, query, where, getDocs } from 'firebase/firestore';

export const Prefil = () => {
  const [user, setUser] = useState(null); // Para el usuario autenticado
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    numero: '',
    contraseña: '',
  });

  // Cargar la información del usuario autenticado
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Guarda el usuario autenticado
        const email = currentUser.email; // Obtén el correo del usuario autenticado

        // Realiza una consulta a Firestore para buscar el documento del usuario basado en el correo
        const q = query(collection(db, 'usuario'), where('correo', '==', email));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Si se encuentra el documento, carga los datos en el formulario
          const userData = querySnapshot.docs[0].data();
          setFormData({
            nombre: userData.nombre || '',
            correo: email, // Usa el correo del usuario autenticado
            numero: userData.numero || '',
            contraseña: userData.contraseña, // Mantén este campo vacío por razones de seguridad
          });
        } else {
          console.log('No se encontraron datos para este usuario.');
        }
      }
    });
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Guardar cambios (opcional)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica para actualizar los datos en Firestore si es necesario
  };

  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}
      <div className={styles.PrefPage}>
        <div className={styles.FormContainer}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="nombre">Nombre:</Label>
              <Input  id="nombre"  name="nombre"  type="text" value={formData.nombre}  onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo:</Label>
              <Input  id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} disabled /> {/* El correo no debería cambiarse */}
            </FormGroup>

            <FormGroup>
              <Label for="numero">Número telefónico:</Label>
              <Input id="numero" name="numero" type="number" value={formData.numero} onChange={handleChange} />
            </FormGroup>

            <FormGroup>
              <Label for="contraseña">Contraseña:</Label>
              <Input id="contraseña" name="contraseña" type="text" value={formData.contraseña} onChange={handleChange} disabled /> 
            </FormGroup>

            <Button className={styles.guar} type="submit">Guardar cambios</Button>
          </Form>
        </div>
      </div>
      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Prefil; // Exporta el componente Prefil
