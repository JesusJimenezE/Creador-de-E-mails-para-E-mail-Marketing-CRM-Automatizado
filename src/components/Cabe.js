import React from 'react';
import { Nav, NavItem } from 'reactstrap'; // Importamos los componentes de navegación desde Reactstrap
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom'; // Renombramos NavLink como RouterNavLink para usar el enrutamiento sin recargar la página
import styles from './Cabe.module.css'; // Importamos los estilos personalizados para la cabecera desde un archivo CSS
import { getAuth, signOut } from 'firebase/auth'; // Importamos Firebase Authentication para cerrar sesión
import logo from './../assets/img/DENEDIGico.png'; // Importamos el logo de la aplicación desde la carpeta de activos

// Componente de cabecera (navegación) de la aplicación
export const Cabe = () => {

  // Hook de navegación para redirigir a diferentes rutas
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    const auth = getAuth(); // Obtenemos la instancia de autenticación de Firebase
    signOut(auth) // Cerramos sesión del usuario autenticado
      .then(() => {
        navigate('/login'); // Redirigimos al usuario a la página de inicio de sesión después de cerrar sesión
      })
      .catch((error) => {
        console.error('Error al cerrar sesión:', error); // Manejo de errores si el cierre de sesión falla
      });
  };

  return (
    // Contenedor principal de la cabecera con los estilos personalizados
    <div className={styles.headerContainer}> 
      
      {/* Sección de navegación principal (parte izquierda de la cabecera) */}
      <div className={styles.nave}>
        {/* Menú de navegación con enlaces a diferentes páginas */}
        <Nav className={styles.leftNav}>

          <NavItem>
            {/* Enlace a la página de inicio usando RouterNavLink para evitar recargas completas */}
            <RouterNavLink to="/home" className={styles['nav-link']}>
              Inicio
            </RouterNavLink>
          </NavItem>

          <NavItem>
            {/* Enlace a la página de contactos */}
            <RouterNavLink to="/contac" className={styles['nav-link']}>
              Contactos
            </RouterNavLink>
          </NavItem>

          <NavItem>
            {/* Enlace a la página de envío de correos electrónicos */}
            <RouterNavLink to="/email" className={styles['nav-link']}>
              E-mail
            </RouterNavLink>
          </NavItem>

          <NavItem>
            {/* Enlace a la página de envío de correos electrónicos */}
            <RouterNavLink to="/regisenvi" className={styles['nav-link']}>
              E-mails enviados
            </RouterNavLink>
          </NavItem>

        </Nav>
        
        {/* Sección de navegación secundaria (parte derecha de la cabecera) */}
        <div className={styles.rightNav}>
          <NavItem>
            {/* Enlace a la página de perfil del usuario */}
            <RouterNavLink to="/perfil" className={styles['nav-link']}>
              Perfil
            </RouterNavLink>
          </NavItem>
          <NavItem>
            {/* Opción de cerrar sesión con un evento onClick que llama a handleLogout */}
            <span className={styles['nav-link']} onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Salir
            </span>
          </NavItem>
        </div>
      </div>
      
      {/* Contenedor del logo que se muestra en la cabecera */}
      <div className={styles['logo-container']}>
        {/* Imagen del logo de la aplicación */}
        <img src={logo} alt="logo" className={styles['logo-image']} />
      </div>
    </div>
  );
};
