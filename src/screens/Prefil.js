import React, { useEffect, useState } from 'react'; // Importa React y hooks
import { Cabe } from '../components/Cabe'; // Importa el componente Cabe
import { Piep } from '../components/Piep'; // Importa el componente Piep
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'; // Importa componentes de Reactstrap
import styles from './Prefil.module.css'; // Importa estilos CSS
import { db } from '../components/firebaseconfig'; // Asegúrate de importar correctamente
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importa las funciones necesarias

const Prefil = () => {
  const [usuario, setUsuario] = useState({ nombre: '', correo: '', numero: '', contraseña: '' });
  const userId = 'ID_DEL_USUARIO'; // Aquí debes obtener el ID del usuario actual (puedes usar el contexto de autenticación o props)

  // useEffect para cargar los datos del usuario al montar el componente
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const docRef = doc(db, 'usuario', userId); // Obtén la referencia del documento
        const docSnap = await getDoc(docRef); // Obtiene el documento

        if (docSnap.exists()) {
          setUsuario(docSnap.data()); // Establece los datos en el estado
        } else {
          console.log("No hay tal documento!");
        }
      } catch (error) {
        console.error("Error al obtener el documento: ", error);
      }
    };

    cargarDatosUsuario();
  }, [userId]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value }); // Actualiza el estado con los cambios
  };

  // Guardar cambios en Firestore
  const handleGuardarCambios = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
    try {
      const docRef = doc(db, 'usuario', userId); // Obtiene la referencia del documento
      await updateDoc(docRef, usuario); // Actualiza el documento con los nuevos datos
      console.log("Datos actualizados correctamente");
    } catch (error) {
      console.error("Error al actualizar los datos: ", error);
    }
  };

  return (
    <div>
      <Cabe /> {/* Componente de cabecera */}

      <div className={styles.PrefPage}> {/* Clase para centrar la página */}
        
        <div className={styles.FormContainer}> {/* Aplicamos la clase FormContainer aquí */}
          <Form onSubmit={handleGuardarCambios}>
            <FormGroup>
              <Label for="nombre">Nombre:</Label>
              <Input 
                id="nombre" 
                name="nombre" 
                type="text" 
                value={usuario.nombre} 
                onChange={handleChange} 
              /> {/* Campo de entrada para nombre */}
            </FormGroup>

            <FormGroup>
              <Label for="correo">Correo:</Label>
              <Input 
                id="correo" 
                name="correo" 
                type="email" 
                value={usuario.correo} 
                onChange={handleChange} 
              /> {/* Campo de entrada para correo */}
            </FormGroup>

            <FormGroup>
              <Label for="numero">Número telefónico:</Label>
              <Input 
                id="numero" 
                name="numero" 
                type="number" 
                value={usuario.numero} 
                onChange={handleChange} 
              /> {/* Campo de entrada para número */}
            </FormGroup>

            <FormGroup>
              <Label for="contraseña">Contraseña:</Label>
              <Input 
                id="contraseña" 
                name="contraseña" 
                type="password" 
                value={usuario.contraseña} 
                onChange={handleChange} 
              /> {/* Campo de entrada para contraseña */}
            </FormGroup>

            <Button className={styles.guar}>Guardar cambios</Button> {/* Botón para guardar cambios */}
          </Form>
        </div>
        
      </div>
      <Piep /> {/* Componente de pie de página */}
    </div>
  );
};

export default Prefil; // Exporta el componente Prefil
