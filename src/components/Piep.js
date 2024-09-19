import React from 'react';
import styles from './Piep.module.css'; // Importa los estilos personalizados
import pie from './../assets/img/pie.png'; // Importa la imagen del pie de página
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importamos el componente para los íconos
import { faFacebook, faGoogle, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Importamos los íconos de redes sociales
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono del teléfono

export const Piep = () => {
    return (
        // Contenedor principal del pie de página
        <div className={styles.pie}>
            {/* Imagen del pie de página */}
            <img src={pie} alt="pie-pagina" className={styles['pie-image']} />

            {/* Ícono de Facebook con un enlace a la página externa */}
            <a href="https://www.facebook.com/EstructuraTuNegocio" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '67%' }}>
                <FontAwesomeIcon icon={faFacebook} />
            </a>

            {/* Ícono de Instagram con un enlace a la página externa */}
            <a href="https://www.instagram.com/estructuratunegocio/" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '71%' }}>
                <FontAwesomeIcon icon={faInstagram} />
            </a>

            {/* Ícono de YouTube con un enlace a la página externa */}
            <a href="https://www.youtube.com/@lacomediadelnegocio" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '75%' }}>
                <FontAwesomeIcon icon={faYoutube} />
            </a>

            {/* Ícono de Google con un enlace a la página externa */}
            <a href="https://www.denedig.online" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '79%' }}>
                <FontAwesomeIcon icon={faGoogle} />
            </a>

            {/* Ícono de teléfono para hacer llamadas */}
            <a href="tel: 55 7389 5088" className={styles.icon} style={{ top: '40%', left: '83%' }}>
                <FontAwesomeIcon icon={faPhone} />
            </a>

            {/* Texto con derechos reservados */}
            <div className={styles.dere} style={{ top: '55%', left: '75%' }}>
                © Todos los derechos reservados © 2024 DENEDIG
            </div>
        </div>
    );
};
