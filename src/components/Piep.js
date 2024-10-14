import React from 'react';
import styles from './Piep.module.css'; // Importa los estilos personalizados del pie de página
import pie from './../assets/img/pie.png'; // Importa la imagen del pie de página
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importamos el componente para los íconos
import { faFacebook, faGoogle, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Importamos íconos de redes sociales
import { faPhone } from '@fortawesome/free-solid-svg-icons'; // Importamos el ícono de teléfono

export const Piep = () => {
    return (
        // Contenedor principal del pie de página
        <div className={styles.pie}>
            {/* Imagen del pie de página */}
            <img src={pie} alt="pie-pagina" className={styles['pie-image']} />

            {/* Enlace con ícono de Facebook que lleva a la página externa de Facebook */}
            <a 
                href="https://www.facebook.com/EstructuraTuNegocio" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.icon} 
                style={{ top: '40%', left: '67%' }}
            >
                <FontAwesomeIcon icon={faFacebook} />
            </a>

            {/* Enlace con ícono de Instagram que lleva a la página externa de Instagram */}
            <a 
                href="https://www.instagram.com/estructuratunegocio/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.icon} 
                style={{ top: '40%', left: '71%' }}
            >
                <FontAwesomeIcon icon={faInstagram} />
            </a>

            {/* Enlace con ícono de YouTube que lleva al canal de YouTube */}
            <a 
                href="https://www.youtube.com/@lacomediadelnegocio" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.icon} 
                style={{ top: '40%', left: '75%' }}
            >
                <FontAwesomeIcon icon={faYoutube} />
            </a>

            {/* Enlace con ícono de Google que lleva al sitio web */}
            <a 
                href="https://www.denedig.online" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.icon} 
                style={{ top: '40%', left: '79%' }}
            >
                <FontAwesomeIcon icon={faGoogle} />
            </a>

            {/* Ícono de teléfono que permite realizar una llamada al número especificado */}
            <a 
                href="tel: 55 7389 5088" 
                className={styles.icon} 
                style={{ top: '40%', left: '83%' }}
            >
                <FontAwesomeIcon icon={faPhone} />
            </a>

            {/* Texto que indica los derechos reservados */}
            <div 
                className={styles.dere} 
                style={{ top: '55%', left: '75%' }}
            >
                © Todos los derechos reservados © 2024 DENEDIG
            </div>
        </div>
    );
};
