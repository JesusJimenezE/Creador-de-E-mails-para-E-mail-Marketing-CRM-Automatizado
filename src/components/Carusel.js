import React from 'react';
import { UncontrolledCarousel } from 'reactstrap'; // Importamos el componente de carrusel sin control desde Reactstrap
import styles from './Carusel.module.css'; // Importamos los estilos personalizados desde un archivo CSS

// Componente Carusel que muestra un carrusel de imágenes con Reactstrap
export const Carusel = () => {
  return (
    // Contenedor principal del carrusel con estilos personalizados
    <div className={styles['carousel-container']}>
      {/* Carrusel sin control manual, que automáticamente cambia las diapositivas */}
      <UncontrolledCarousel
        items={[
          {
            altText: 'Slide 1', // Texto alternativo que se muestra si la imagen no se carga, importante para la accesibilidad
            caption: 'Slide 1', // Leyenda que aparece debajo de la imagen
            key: 1, // Clave única para identificar cada elemento del carrusel
            src: 'https://content.clara.es/medio/2024/06/05/frases-motivadoras-de-trabajo-duro_00000000_3853915f_240605120108_1200x630.jpg' // URL de la imagen para la primera diapositiva
          },
          {
            altText: 'Slide 2',
            caption: 'Slide 2',
            key: 2,
            src: 'https://assets.asana.biz/transform/c693264d-d11e-404d-bed6-fd19df1e919a/inline-leadership-team-motivational-quotes-6-es-2x' // URL de la imagen para la segunda diapositiva
          },
          {
            altText: 'Slide 3',
            caption: 'Slide 3',
            key: 3,
            src: 'https://static.guiainfantil.com/media/22796/frases-motivacion-enero-ninos.jpg' // URL de la imagen para la tercera diapositiva
          }
        ]}
      />
    </div>
  );
};
