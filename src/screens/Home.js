import React from 'react'; // Importamos React.
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera.
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página.
import { Carusel } from '../components/Carusel'; // Importamos el componente del carrusel de imágenes.

export const Home = () => { // Definimos el componente Home.
  return (
    <div>
      {/* Componente de la cabecera */}
      <Cabe />

      {/* Componente del carrusel que muestra imágenes o contenido destacado */}
      <div>
        <Carusel /> {/* Renderizamos el componente Carusel que probablemente contiene imágenes o contenido rotativo. */}
      </div>

      {/* Componente del pie de página */}
      <Piep /> {/* Renderizamos el pie de página */}
    </div>
  );
};

export default Home; // Exportamos el componente como predeterminado.
