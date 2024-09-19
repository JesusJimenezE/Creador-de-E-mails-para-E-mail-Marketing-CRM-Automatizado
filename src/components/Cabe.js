import React from 'react';
import { Nav, NavItem } from 'reactstrap'; //importamos las herramientas de bootstrap que se van a usar
import { NavLink as RouterNavLink } from 'react-router-dom'; //importamos NavLink y le cambiamos el nombre para usarlo como RouterNavLink
import styles from './Cabe.module.css'; //importamos los estilos personalizados desde un archivo CSS
import logo from './../assets/img/DENEDIGico.png'; //importamos el logo desde la carpeta de imágenes

export const Cabe = () => {
  return ( 
    // usamos el div para darle los diseños de la página en ciertas partes, por lo mismo le agregamos clases y estilos donde le ponemos el nombre de esa parte
    <div className={styles.headerContainer}> 
      
      {/* Sección de navegación principal */}
      <div className={styles.nave}>
        <Nav className={styles.leftNav}>
          <NavItem>
            {/* Usamos RouterNavLink para el redireccionamiento sin recargar la página */}
            <RouterNavLink to="/home" className={styles['nav-link']}>
              Inicio
            </RouterNavLink>
          </NavItem>
          <NavItem>
            <RouterNavLink to="/contac" className={styles['nav-link']}>
              Contactos
            </RouterNavLink>
          </NavItem>
          <NavItem>
            <RouterNavLink to="/email" className={styles['nav-link']}>
              E-mail
            </RouterNavLink>
          </NavItem>
        </Nav>
        
        {/* Sección de navegación secundaria (parte derecha) */}
        <div className={styles.rightNav}>
          <NavItem>
            <RouterNavLink to="/perfil" className={styles['nav-link']}>
              Perfil
            </RouterNavLink>
          </NavItem>
          <NavItem>
            <RouterNavLink to="/app" className={styles['nav-link']}>
              Salir
            </RouterNavLink>
          </NavItem>
        </div>
      </div>
      
      {/* Contenedor del logo */}
      <div className={styles['logo-container']}>
        <img src={logo} alt="logo" className={styles['logo-image']} /> {/* Mostramos el logo importado */}
      </div>
    </div>
  );
};
