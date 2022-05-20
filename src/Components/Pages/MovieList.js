import React, { useState, useEffect } from 'react';
import MovieCard from '../AppComponents/MovieCard';
import { v4 as uuidv4 } from 'uuid';
import MovieNavBar from '../AppComponents/MovieNavBar';

const MovieList = () => {

    const [dataMovieList, setDataMovieList] = useState([]);
    const [movieListOption, setMovieListOption] = useState(["release_date", "desc", 1]);
    const [totalPages, setTotalPages] = useState();
    
    useEffect(() => {
        window.scrollTo(0, 0);

        fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + process.env.REACT_APP_API_KEY +'&language=fr-FR&sort_by=' + movieListOption[0] + '.' + movieListOption[1] + '&include_adult=false&include_video=false&page=' + movieListOption[2] + '&vote_count.gte=400')
        .then(res => res.json())
        .then(data => {
            let arr = [];
            let item;
            for (let i = 0; i < data.results.length;i++) {
                item = {
                    movieId : data.results[i].id,
                    title : data.results[i].title,
                    release : data.results[i].release_date,
                    img : data.results[i].poster_path,
                    overview : data.results[i].overview,
                    id : uuidv4()
                };
                arr.push(item);
            }
            setTotalPages(data.total_pages);
            setDataMovieList(arr);
        })
    },[movieListOption])

    const sortList = (value) => {
        if (movieListOption[0] !== value) {
            let newArr = [];
            newArr.push(value);
            newArr.push(movieListOption[1]);
            newArr.push(movieListOption[2]);
            setMovieListOption(newArr);
        }   
    }
    
    const sortReverse = (value) => {
        if (movieListOption[1] !== value) {
            let newArr = [];
            newArr.push(movieListOption[0]);
            newArr.push(value);
            newArr.push(movieListOption[2]);
            setMovieListOption(newArr);
        }
    }

    const changePage = (val) => {
        let numb = movieListOption[2];
        numb = numb + val;
        let newArr = [];
        newArr.push(movieListOption[0]);
        newArr.push(movieListOption[1]);
        newArr.push(numb); 
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
        setMovieListOption(newArr);
    }
    
    return (
        <main className='movieList'> 
            <MovieNavBar />
            <section className="movieList_options">
                    <select defaultValue="release_date" name="sortBy" onChange={(e) => sortList(e.target.value)}>
                        <option value="popularity">Popularité</option>
                        <option value="release_date">Date de sortie</option>
                        <option value="vote_average">Note</option>
                    </select>
                    <select defaultValue="desc"  name="byPage" onChange={(e) => sortReverse(e.target.value)}>
                        <option value="desc">↓</option>
                        <option value="asc">↑</option>
                    </select> 
            </section>
            <ul>
              {dataMovieList.map((el) => {
                  return (
                      <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                      poster={el.img} overview={el.overview} movieId={el.movieId} />
                      )
                    })}      
            </ul>
            <section className="movieList_pagesBtn">
                    {(movieListOption[2] !== 1) && <button onClick={() => changePage(-1)} className='movieList_pagesBtn_btn'>{movieListOption[2] - 1}</button>}
                    <button className='movieList_pagesBtn_btn movieList_pagesBtn_btn--active'>{movieListOption[2]}</button>             
                    {(movieListOption[2] <  totalPages) && <button onClick={() => changePage(1)} className='movieList_pagesBtn_btn'>{movieListOption[2] + 1}</button>}
                    {(movieListOption[2] < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='movieList_pagesBtn_btn'>{movieListOption[2] + 2}</button>}
                    {(movieListOption[2] < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='movieList_pagesBtn_btn'>{movieListOption[2] + 3}</button>}            
            </section>
        </main>
    );
};

export default MovieList;