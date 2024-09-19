import React from 'react';
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import { Carusel } from '../components/Carusel'; // Importamos el componente del carrusel de imágenes

export const Home = () => {
  return (
    <div>
      {/* Componente de la cabecera */}
      <Cabe /> 

      {/* Componente del carrusel que muestra imágenes o contenido destacado */}
      <div>
        <Carusel />
      </div>

      {/* Componente del pie de página */}
      <Piep />
    </div>
  );
};

export default Home; // Exportamos el componente como predeterminado

