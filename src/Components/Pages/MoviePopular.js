import React, { useState, useEffect } from 'react';
import MovieCard from '../AppComponents/MovieCard';
import { v4 as uuidv4 } from 'uuid';
import MovieNavBar from '../AppComponents/MovieNavBar';

const MoviePopular = () => {

    const [dataMoviePopular, setDataMoviePopular] = useState([]);
    const [changePagePopular, setChangePagePopular] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&page=' + changePagePopular)
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
            setTotalPages(datas.total_pages);
            setDataMoviePopular(arr);
        })
    },[changePagePopular])


    const changePage = (val) => {
        let newVal = changePagePopular + val;
       setChangePagePopular(newVal);
    }

    return (
        <main className='movieList'> 
            <MovieNavBar />
            <div className="movieList_options"></div>
            <ul>
              {dataMoviePopular.map((el) => {
                  return (
                      <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                      poster={el.img} overview={el.overview} movieId={el.movieId} />
                      )
                    })}      
            </ul>
            <div className="movieList_pagesBtn">
                    {(changePagePopular !== 1) && <button onClick={() => changePage(-1)} className='movieList_pagesBtn_btn'>{changePagePopular - 1}</button>}
                    <button className='movieList_pagesBtn_btn movieList_pagesBtn_btn--active'>{changePagePopular}</button>             
                    {(changePagePopular <  totalPages) && <button onClick={() => changePage(1)} className='movieList_pagesBtn_btn'>{changePagePopular + 1}</button>}
                    {(changePagePopular < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='movieList_pagesBtn_btn'>{changePagePopular + 2}</button>}
                    {(changePagePopular < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='movieList_pagesBtn_btn'>{changePagePopular + 3}</button>}            
            </div>
        </main>
    );
};

export default MoviePopular;