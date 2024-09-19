import React from 'react';
import { UncontrolledCarousel } from 'reactstrap'; // Importamos el componente de carrusel sin control de Reactstrap
import styles from './Carusel.module.css'; // Asegúrate de importar los estilos

export const Carusel = () => {
  return (
    // Usamos un div contenedor para aplicar los estilos personalizados al carrusel
    <div className={styles['carousel-container']}>
      <UncontrolledCarousel
        items={[
          {
            altText: 'Slide 1', // Texto alternativo para la accesibilidad
            caption: 'Slide 1', // Leyenda de la diapositiva
            key: 1, // Llave única para identificar esta diapositiva
            src: 'https://content.clara.es/medio/2024/06/05/frases-motivadoras-de-trabajo-duro_00000000_3853915f_240605120108_1200x630.jpg' // URL de la imagen de la primera diapositiva
          },
          {
            altText: 'Slide 2',
            caption: 'Slide 2',
            key: 2,
            src: 'https://assets.asana.biz/transform/c693264d-d11e-404d-bed6-fd19df1e919a/inline-leadership-team-motivational-quotes-6-es-2x' // URL de la imagen de la segunda diapositiva
          },
          {
            altText: 'Slide 3',
            caption: 'Slide 3',
            key: 3,
            src: 'https://static.guiainfantil.com/media/22796/frases-motivacion-enero-ninos.jpg' // URL de la imagen de la tercera diapositiva
          }
        ]}
      />
    </div>
  );
};
