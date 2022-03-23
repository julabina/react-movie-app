import React from 'react';
import { NavLink } from 'react-router-dom';

const MovieNavBar = () => {
    return (
            <nav className='littleNavBar movieNavBar'>
                <div className="movieNavBar_linkCont toMovieHome">
                    <NavLink to="/movie" >Home</NavLink>
                </div>
                <div className="movieNavBar_linkCont">
                    <NavLink to="/movie/all" >Tous les films</NavLink>
                </div>
                <div className="movieNavBar_linkCont">
                    <NavLink to="/movie/top_rated" >Les mieux notés</NavLink>
                </div>
                <div className="movieNavBar_linkCont">
                    <NavLink to="/movie/popular" >Les plus populaires</NavLink>
                </div>
            </nav>
    );
};

export default MovieNavBar;