import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    return (
        <nav className='mainNavBar'>
            <div className="mainNavBar_linkCont">
            <NavLink to="/" style={{height : "40px"}} className={({isActive}) => {
                return isActive ? "active mainNavBar_linkCont_link" : "mainNavBar_linkCont_link";
            }} >Accueil</NavLink>
            </div>
            <div className="mainNavBar_linkCont">
            <NavLink to="/movie" className={({isActive}) => {
                return isActive ? "active mainNavBar_linkCont_link" : "mainNavBar_linkCont_link";
            }} >Film</NavLink>
            </div>
            <div className="mainNavBar_linkCont">
            <NavLink to="/tv" className={({isActive}) => {
                return isActive ? "active mainNavBar_linkCont_link" : "mainNavBar_linkCont_link";
            }} >Serie tv</NavLink> 
            </div>
        </nav>
    );
};

export default NavBar;