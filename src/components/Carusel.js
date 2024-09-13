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
            src: 'https://picsum.photos/seed/picsum/1200/600'
          },
          {
            altText: 'Slide 2',
            caption: 'Slide 2',
            key: 2,
            src: 'https://picsum.photos/id/456/1200/600'
          },
          {
            altText: 'Slide 3',
            caption: 'Slide 3',
            key: 3,
            src: 'https://picsum.photos/id/678/1200/600'
          }
        ]}
      />
    </div>
  );
};
