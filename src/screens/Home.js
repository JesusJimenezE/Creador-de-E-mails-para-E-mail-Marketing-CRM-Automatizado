import React from 'react';
import { Cabe } from '../components/Cabe'; 
import { Piep } from '../components/Piep';
import { Carusel } from '../components/Carusel';

export const Home = () => {
  return (
    <div>
      <Cabe /> 

      <div>
        <Carusel/>
      </div>

      <Piep/>
    </div>
  );
};

export default Home;
