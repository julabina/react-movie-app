import React, { useState, useEffect } from 'react';
import MovieCard from '../AppComponents/MovieCard';
import { v4 as uuidv4 } from 'uuid';

const MovieList = () => {

    const [dataMovieList, setDataMovieList] = useState([]);
    
    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_API_KEY +'&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
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
    },[])
    
    return (
        <>
        <main className='movieList'> 
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