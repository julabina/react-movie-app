import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <NavLink to="/" >Accueil</NavLink>
            <NavLink to="/movie">Film</NavLink>
            <NavLink to="/tv">Serie tv</NavLink>
        </nav>
    );
};

export default NavBar;