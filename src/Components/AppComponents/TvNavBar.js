import React from 'react';
import { NavLink } from 'react-router-dom';

const TvNavBar = () => {
    return (
        <nav className='littleNavBar tvNavBar'>
            <div className="tvNavBar_linkCont">
                <NavLink to="" >Toutes les series</NavLink>
            </div>
            <div className="tvNavBar_linkCont">
                <NavLink to="" >Les mieux notées</NavLink>
            </div>
            <div className="tvNavBar_linkCont">
                <NavLink to="" >Les plus populaires</NavLink>
            </div>
        </nav>
    );
};

export default TvNavBar;