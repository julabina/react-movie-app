import React, { useState, useEffect } from 'react';
import MovieCard from '../AppComponents/MovieCard';
import { v4 as uuidv4 } from 'uuid';
import MovieNavBar from '../AppComponents/MovieNavBar';

const MoviePopular = () => {

    const [dataMoviePopular, setDataMoviePopular] = useState([]);
    const [changePagePopular, setChangePagePopular] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&page=' + changePagePopular)
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
            setDataMoviePopular(arr);
        })
    },[changePagePopular])


    const changePage = (val) => {
        let newVal = changePagePopular + val;
        document.querySelector("body").scrollTo(0,0)
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
        setChangePagePopular(newVal);
    }

    return (
        <main className='movieList'> 
            <MovieNavBar />
            <section className="movieList_options"></section>
            <ul>
              {dataMoviePopular.map((el) => {
                  return (
                      <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                      poster={el.img} overview={el.overview} movieId={el.movieId} />
                      )
                    })}      
            </ul>
            <section className="movieList_pagesBtn">
                    {(changePagePopular !== 1) && <button onClick={() => changePage(-1)} className='movieList_pagesBtn_btn'>{changePagePopular - 1}</button>}
                    <button className='movieList_pagesBtn_btn movieList_pagesBtn_btn--active'>{changePagePopular}</button>             
                    {(changePagePopular <  totalPages) && <button onClick={() => changePage(1)} className='movieList_pagesBtn_btn'>{changePagePopular + 1}</button>}
                    {(changePagePopular < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='movieList_pagesBtn_btn'>{changePagePopular + 2}</button>}
                    {(changePagePopular < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='movieList_pagesBtn_btn'>{changePagePopular + 3}</button>}            
            </section>
        </main>
    );
};

export default MoviePopular;