import React, { useState, useEffect } from 'react';
import MovieCard from '../AppComponents/MovieCard';
import { v4 as uuidv4 } from 'uuid';

const MovieList = () => {

    const [dataMovieList, setDataMovieList] = useState([]);
    const [movieListOption, setMovieListOption] = useState(["popularity", "desc"]);
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_API_KEY +'&language=fr-FR&sort_by=' + movieListOption[0] + '.' + movieListOption[1] + '&include_adult=false&include_video=false&page=1&vote_count.gte=400')
        .then(res => res.json())
        .then(datas => {
            let arr = [];
            let item;
            for (let i = 0; i < datas.results.length;i++) {
                item = {
                    movieId : datas.results[i].id,
                    title : datas.results[i].title,
                    release : datas.results[i].release_date,
                    img : datas.results[i].poster_path,
                    overview : datas.results[i].overview,
                    id : uuidv4()
                };
                arr.push(item);
            }
            setDataMovieList(arr);
        })
    },[movieListOption])

    const sortList = (value) => {
        if (movieListOption[0] !== value) {
            let newArr = [];
            newArr.push(value);
            newArr.push(movieListOption[1]);
            setMovieListOption(newArr);
        }   
    }
    
    const sortReverse = (value) => {
        if (movieListOption[1] !== value) {
            let newArr = [];
            newArr.push(movieListOption[0]);
            newArr.push(value);
            setMovieListOption(newArr);
        }
    }
    
    return (
        <>
        <main className='movieList'> 
        <div className="movieList_options">
            <select name="sortBy" onChange={(e) => sortList(e.target.value)}>
                <option defaultChecked value="popularity">Popularité</option>
                <option value="release_date">Date de sortie</option>
                <option value="vote_average">Note</option>
            </select>
            <select name="byPage" onChange={(e) => sortReverse(e.target.value)}>
                <option defaultChecked value="desc">↓</option>
                <option value="asc">↑</option>
            </select>
        </div>
              <ul>
              {dataMovieList.map((el) => {
                  return (
                      <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                      poster={el.img} overview={el.overview} movieId={el.movieId} />
                      )
                    })}      
            </ul>
        </main>
        </>
    );
};

export default MovieList;