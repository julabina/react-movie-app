import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav>
            <NavLink to="/" className={({isActive}) => {
                return isActive ? "active" : "";
            }} >Accueil</NavLink>
            <NavLink to="/movie" className={({isActive}) => {
                return isActive ? "active" : "";
            }} >Film</NavLink>
            <NavLink to="/tv" className={({isActive}) => {
                return isActive ? "active" : "";
            }} >Serie tv</NavLink>
        </nav>
    );
};

export default NavBar;