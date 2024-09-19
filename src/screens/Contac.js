import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para redirigir entre páginas
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import { CustomCard } from '../components/CustomCard'; // Importamos el componente de las tarjetas de contacto
import { Button } from 'reactstrap'; // Importamos el botón de Reactstrap
import styles from './Contac.module.css'; // Importamos los estilos específicos de esta pantalla

export const Contac = () => {
  const navigate = useNavigate(); // Creamos una instancia de useNavigate para redirigir a otras rutas

  // Función para manejar el clic en el botón "Agregar"
  const handleButtonClick = () => {
    navigate('/nuecont'); // Redirige a la página para agregar un nuevo contacto
  };

  return (
    <div>
      {/* Componente de la cabecera */}
      <Cabe />
      
      {/* Contenedor con el botón "Agregar" */}
      <div className={styles.cons}> 
        <Button className={styles.agre} onClick={handleButtonClick}>
          Agregar
        </Button>
      </div>
      
      {/* Componente que muestra las tarjetas de contacto */}
      <div>
        <CustomCard />
      </div>
      
      {/* Componente del pie de página */}
      <Piep />
    </div>
  );
};

export default Contac; // Exportamos el componente como predeterminado
