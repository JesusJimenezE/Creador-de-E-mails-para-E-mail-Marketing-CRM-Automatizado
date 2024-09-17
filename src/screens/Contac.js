import React from 'react';
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import { CustomCard } from '../components/CustomCard'; 
import { Button } from 'reactstrap';
import styles from './Contac.module.css';

export const Contac = () => {
  return (
    <div>
      <Cabe />
      <div className={styles.cons}>
        <Button className={styles.agre}>Agregar</Button>
      </div>
      <div>
        <CustomCard />
      </div>
      <Piep />
    </div>
  );
};

export default Contac;

