import React, { useState, useEffect } from 'react';
import MovieNavBar from '../AppComponents/MovieNavBar';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from '../AppComponents/MovieCard';

const MovieHome = () => {

    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [dataMovieSearch, setDataMovieSearch] = useState([]);

    useEffect(() => {

        console.log(searchValue);
            fetch('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=' + searchValue + '&page=1&include_adult=false')
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    let arr = [];
                    let item;
                    for (let i = 0;i < data.results.length;i++) {
                        item = {
                            title : data.results[i].title,
                            id: uuidv4(),
                            release : data.results[i].release_date,
                            img: data.results[i].poster_path,
                            movieId: data.results[i].id,
                            overview : data.results[i].overview
                        }
                        arr.push(item)
                    }
                    setDataMovieSearch(arr); 
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
            <h2 className='movieHome_title'>CINEMA</h2>
            <div className="tvHome_separator"></div>
            <form className='movieHome_form' onSubmit={searchMovie}>
                <label htmlFor='search'>
                    Rechercher un film
                    <input className='movieHome_form_inputTxt' type="text" name="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  autoComplete='off'/>
                </label>
                <input className='movieHome_form_btn' type="submit" value="Rechercher"/>
            </form>  
            <ul>
                {dataMovieSearch.map((el) => {
                    return  <MovieCard title={el.title} key={el.id} id={el.id} release={el.release} poster={el.img} overview={el.overview} movieId={el.movieId} fromHome={true} />
                })}
            </ul>
        </main>
    );
};

export default MovieHome;