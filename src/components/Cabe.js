import React from 'react';
import './Cabe.module.css';
import { Nav, NavItem, NavLink } from 'reactstrap'; // Importa los componentes necesarios

export const Cabe = () => {
  return (
    <div className="nave">
      <Nav>
        <NavItem>
          <NavLink active href="./../screens/Home.js">
            Inicio
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="./../screens/Contac.js">
            Contactos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="./../screens/Email.js">
            E-mail
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
