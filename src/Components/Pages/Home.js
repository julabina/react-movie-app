import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PersonCard from '../AppComponents/PersonCard';
import MovieCard from '../AppComponents/MovieCard';
import TvCard from '../AppComponents/TvCard';

const Home = () => {

    const [searchData, setSearchData] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("")

    useEffect(() => {
        if (searchValue !== "") {
            fetch('https://api.themoviedb.org/3/search/multi?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=' + searchValue + '&page=1&include_adult=false')
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                        let arr = [],
                        item;
                        for (let i = 0; i < data.results.length; i++) {
                            if (data.results[i].media_type === "tv") {
                            item = {
                                type : data.results[i].media_type,
                                title : data.results[i].name,
                                id: uuidv4(),
                                poster: data.results[i].poster_path,
                                tvId: data.results[i].id,
                                overview : data.results[i].overview
                            }
                        } else if (data.results[i].media_type === "movie") {
                            console.log("movie");
                            item = {
                                type : data.results[i].media_type,
                                title : data.results[i].title,
                                id: uuidv4(),
                                release : data.results[i].release_date,
                                img: data.results[i].poster_path,
                                movieId: data.results[i].id,
                                overview : data.results[i].overview
                            }
                        } else if (data.results[i].media_type === "person") {
                            item = {
                                type: data.results[i].media_type,
                                names: data.results[i].name,
                                id: uuidv4(),
                                profile: data.results[i].profile_path,
                                personId: data.results[i].id,
                                gender: data.results[i].gender
                            }
                        }
                        
                        arr.push(item);
                    }
                    setSearchData(arr);
                }
            })
        }
    },[searchValue])

    const searchGlobal = (e) => {
        e.preventDefault();
        setSearchValue(inputValue);
        setInputValue("");
    }

    return (
        <main className='home'>
            <section className='home_linkContainer'>
                <NavLink to="/movie">
                    <div className="home_linkContainer_link">FILMS</div>
                </NavLink>
                <NavLink to="/tv">
                    <div className="home_linkContainer_link">SERIES TV</div>
                </NavLink>
            </section>
            <form className='home_search' onSubmit={searchGlobal}>
                <label htmlFor='search'>
                    rechercher un film, une serie ou une personnalité
                    <input className='home_search_label_input' type="text" name='search' value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </label>
                    <input className='home_search_submit' type="submit" value="Rechercher" />
            </form>
            <ul>
                {searchData.map(el => {
                    if (el.type === "movie") {
                        return  <MovieCard title={el.title} key={el.id} id={el.id} release={el.release} poster={el.img} overview={el.overview} movieId={el.movieId} fromHome={true} />
                    } else if (el.type === "tv") {
                        return  <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} fromHome={true} />
                    } else if (el.type === "person") {
                        return <PersonCard names={el.names} key={el.id} profile={el.profile} personId={el.personId} gender={el.gender} fromHome={true} />
                    }
                })}
            </ul>
        </main>
    );
};

export default Home;