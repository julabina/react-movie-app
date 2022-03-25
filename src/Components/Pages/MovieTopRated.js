import React, { useState, useEffect } from 'react';
import MovieCard from '../AppComponents/MovieCard';
import { v4 as uuidv4 } from 'uuid';
import MovieNavBar from '../AppComponents/MovieNavBar';

const MovieTopRated = () => {

    const [dataMovieTopRated, setDataMovieTopRated] = useState([]);
    const [changePageTopRated, setChangePageTopRated] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=' + process.env.REACT_APP_API_KEY + '&page=' + changePageTopRated + '&language=fr-FR')
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
            setDataMovieTopRated(arr);
        })
    },[changePageTopRated])


    const changePage = (val) => {
       let newVal = changePageTopRated + val;
       window.scrollTo({
           top:0,
           behavior: 'smooth'
       });
       setChangePageTopRated(newVal);
    }

    return (
        <main className='movieList'> 
            <MovieNavBar />
            <div className="movieList_options"></div>
                <ul>
                {dataMovieTopRated.map((el) => {
                    return (
                        <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                        poster={el.img} overview={el.overview} movieId={el.movieId} />
                        )
                        })}      
                </ul>
                <div className="movieList_pagesBtn">
                    {(changePageTopRated !== 1) && <button onClick={() => changePage(-1)} className='movieList_pagesBtn_btn'>{changePageTopRated - 1}</button>}
                    <button className='movieList_pagesBtn_btn movieList_pagesBtn_btn--active'>{changePageTopRated}</button>             
                    {(changePageTopRated <  totalPages) && <button onClick={() => changePage(1)} className='movieList_pagesBtn_btn'>{changePageTopRated + 1}</button>}
                    {(changePageTopRated < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='movieList_pagesBtn_btn'>{changePageTopRated + 2}</button>}
                    {(changePageTopRated < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='movieList_pagesBtn_btn'>{changePageTopRated + 3}</button>}            
            </div>
        </main>
    );
};

export default MovieTopRated;