import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {

    const [searchDatas, setSearchDatas] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/search/multi?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=cassel&page=1&include_adult=false')
        .then(res => res.json())
        .then(datas => {
            let arr = [];
            console.log(datas);
        })
    },[])

    return (
        <main className='home'>
            <NavLink to="/movie">
                <div className="home_link">FILMS</div>
            </NavLink>
            <NavLink to="/tv">
                <div className="home_link">SERIES TV</div>
            </NavLink>
        </main>
    );
};

export default Home;