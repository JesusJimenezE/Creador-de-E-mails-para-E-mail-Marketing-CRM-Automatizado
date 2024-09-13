import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap'; // Importa los componentes necesarios

export const Cabe = () => {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink active href="#">
            Link
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            Another Link
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">
            Disabled Link
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};
