import React from 'react';
import { NavLink } from 'react-router-dom';

const TvNavBar = () => {
    return (
        <nav className='littleNavBar tvNavBar'>
            <div className="toTvHome">
                <NavLink to="/tv" >Home</NavLink>
            </div>
            <div className="tvNavBar_linkCont">
                <NavLink to="/tv/all" >Toutes les series</NavLink>
            </div>
            <div className="tvNavBar_linkCont">
                <NavLink to="/tv/top_rated" >Les mieux notées</NavLink>
            </div>
            <div className="tvNavBar_linkCont">
                <NavLink to="/tv/popular" >Les plus populaires</NavLink>
            </div>
        </nav>
    );
};

export default TvNavBar;