import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieNavBar = () => {
    return (
            <nav className='littleNavBar movieNavBar'>
                <div className="movieNavBar_linkCont">
                    <NavLink to="" >Tous les films</NavLink>
                </div>
                <div className="movieNavBar_linkCont">
                    <NavLink to="" >Les mieux notés</NavLink>
                </div>
                <div className="movieNavBar_linkCont">
                    <NavLink to="" >Les plus populaires</NavLink>
                </div>
            </nav>
    );
};

export default MovieNavBar;