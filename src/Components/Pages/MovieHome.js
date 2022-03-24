import React, { useState, useEffect } from 'react';
import MovieNavBar from '../AppComponents/MovieNavBar';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from '../AppComponents/MovieCard';

const MovieHome = () => {

    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [datasMovieSearch, setDatasMovieSearch] = useState([]);

    useEffect(() => {

        console.log(searchValue);
            fetch('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=' + searchValue + '&page=1&include_adult=false')
            .then(res => res.json())
            .then(datas => {
                if (datas.results) {
                    let arr = [];
                    let item;
                    for (let i = 0;i < datas.results.length;i++) {
                        item = {
                            title : datas.results[i].title,
                            id: uuidv4(),
                            release : datas.results[i].release_date,
                            img: datas.results[i].poster_path,
                            movieId: datas.results[i].id,
                            overview : datas.results[i].overview
                        }
                        arr.push(item)
                    }
                    setDatasMovieSearch(arr); 
                }
            })     
    },[searchValue])

    const searchMovie = (e) => {
        e.preventDefault();
        setSearchValue(inputValue);
        setInputValue("");
    }

    return (
        <main className='movieHome'> 
            <MovieNavBar /> 
            <h1 className='movieHome_title'>CINEMA</h1>
            <div className="tvHome_separator"></div>
            <form className='movieHome_form' onSubmit={searchMovie}>
                <label>
                    Rechercher un film
                    <input className='movieHome_form_inputTxt' type="text" name="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  autoComplete='off'/>
                </label>
                <input className='movieHome_form_btn' type="submit"/>
            </form>  
            {}
            <ul>
                {datasMovieSearch.map((el) => {
                    return  <MovieCard title={el.title} key={el.id} id={el.id} release={el.release} poster={el.img} overview={el.overview} movieId={el.movieId} fromHome={true} />
                })}
            </ul>
        </main>
    );
};

export default MovieHome;