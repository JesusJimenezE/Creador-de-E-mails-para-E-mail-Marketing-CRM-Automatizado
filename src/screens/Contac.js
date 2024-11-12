import React from 'react';
import { Cabe } from '../components/Cabe'; // Importamos el componente de la cabecera
import { Piep } from '../components/Piep'; // Importamos el componente del pie de página
import { CustomCard } from '../components/CustomCard'; // Importamos el componente de las tarjetas de contacto
export const Contac = () => {


  return (
    <div>
      {/* Componente de la cabecera */}
      <Cabe />
      
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
