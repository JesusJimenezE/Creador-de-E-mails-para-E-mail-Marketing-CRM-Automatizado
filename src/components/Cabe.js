import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from './Cabe.module.css'; 
import logo from './../assets/img/DENEDIGico.png';

export const Cabe = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.nave}>
        <Nav className={styles.leftNav}>
          <NavItem>
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
      <div className={styles['logo-container']}>
        <img src={logo} alt="logo" className={styles['logo-image']} />
      </div>
    </div>
  );
};
