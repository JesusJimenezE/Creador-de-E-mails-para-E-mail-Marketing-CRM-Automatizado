import React from 'react';
import styles from './Piep.module.css';
import pie from './../assets/img/pie.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

export const Piep = () => {
    return (
        <div className={styles.pie}>
            <img src={pie} alt="pie-pagina" className={styles['pie-image']} />

            <a href="https://www.facebook.com/EstructuraTuNegocio" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '67%' }}>
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://www.instagram.com/estructuratunegocio/" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '71%' }}>
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.youtube.com/@lacomediadelnegocio" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '75%' }}>
                <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://www.denedig.online" target="_blank" rel="noopener noreferrer" className={styles.icon} style={{ top: '40%', left: '79%' }}>
                <FontAwesomeIcon icon={faGoogle} />
            </a>
            <a href="tel: 55 7389 5088" className={styles.icon} style={{ top: '40%', left: '83%' }}>
                <FontAwesomeIcon icon={faPhone} />
            </a>
            <div className={styles.dere}>
                © Todos los derechos reservados © 2024 DENEDIG
            </div>
        </div>
    );
};

