import React from 'react';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import { CustomCard } from '../components/CustomCard'; // Asegúrate de importar correctamente tu componente
import { Button } from 'reactstrap';

export const Contac = () => {
  return (
    <div>
      <Cabe />
      <Button outline color="primary" >
              Agregar contacto
            </Button>
      <div>
        <CustomCard />
      </div>
      <Piep />
    </div>
  );
};

export default Contac;
