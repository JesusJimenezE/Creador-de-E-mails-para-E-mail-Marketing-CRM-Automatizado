import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Cabe } from '../components/Cabe';
import { Piep } from '../components/Piep';
import { CustomCard } from '../components/CustomCard';
import { Button } from 'reactstrap';
import styles from './Contac.module.css';

export const Contac = () => {
  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleButtonClick = () => {
    navigate('/nuecont'); // Redirige a Nuecont
  };

  return (
    <div>
      <Cabe />
      <div className={styles.cons}> 
        <Button className={styles.agre} onClick={handleButtonClick}>
          Agregar
        </Button>
      </div>
      <div>
        <CustomCard />
      </div>
      <Piep />
    </div>
  );
};

export default Contac;