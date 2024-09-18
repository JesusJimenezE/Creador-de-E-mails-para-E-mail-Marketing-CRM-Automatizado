import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import styles from './Carusel.module.css'; // Asegúrate de importar los estilos

export const Carusel = () => {
  return (
    <div className={styles['carousel-container']}>
      <UncontrolledCarousel
        items={[
          {
            altText: 'Slide 1',
            caption: 'Slide 1',
            key: 1,
            src: 'https://content.clara.es/medio/2024/06/05/frases-motivadoras-de-trabajo-duro_00000000_3853915f_240605120108_1200x630.jpg'
          },
          {
            altText: 'Slide 2',
            caption: 'Slide 2',
            key: 2,
            src: 'https://assets.asana.biz/transform/c693264d-d11e-404d-bed6-fd19df1e919a/inline-leadership-team-motivational-quotes-6-es-2x'
          },
          {
            altText: 'Slide 3',
            caption: 'Slide 3',
            key: 3,
            src: 'https://static.guiainfantil.com/media/22796/frases-motivacion-enero-ninos.jpg'
          }
        ]}
      />
    </div>
  );
};
