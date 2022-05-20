import React, { useState, useEffect } from 'react';
import TvCard from '../AppComponents/TvCard';
import { v4 as uuidv4 } from 'uuid';
import TvNavBar from '../AppComponents/TvNavBar';

const TvPopular = () => {

    const [dataTvPopular, setDataTvPopular] = useState([]);
    const [changePagePopular, setChangePagePopular] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('https://api.themoviedb.org/3/tv/popular?api_key=' + process.env.REACT_APP_API_KEY + '&page=' + changePagePopular + '&language=fr-FR')
        .then(res => res.json())
        .then(data => {
            let arr = [];
            let item;
            for (let i = 0; i < data.results.length;i++) {
                item = {
                    title : data.results[i].name,
                    poster : data.results[i].poster_path,
                    overview : data.results[i].overview,
                    id: uuidv4(),
                    tvId : data.results[i].id
                };
                arr.push(item);
            }
            setTotalPages(data.total_pages);
            setDataTvPopular(arr);
        })
    },[changePagePopular])


    const changePage = (val) => {
       let newVal = changePagePopular + val;
       window.scrollTo({
        top:0,
        behavior: 'smooth'
        });
       setChangePagePopular(newVal);
    }
    return (
        <main className='tvList'> 
            <TvNavBar />
            <section className="tvList_options"></section>
                <ul>
                {dataTvPopular.map((el) => {
                    return (
                        <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} />
                        )
                        })}      
                </ul>
                <section className="tvList_pagesBtn">
                    {(changePagePopular !== 1) && <button onClick={() => changePage(-1)} className='tvList_pagesBtn_btn'>{changePagePopular - 1}</button>}
                    <button className='tvList_pagesBtn_btn tvList_pagesBtn_btn--active'>{changePagePopular}</button>             
                    {(changePagePopular <  totalPages) && <button onClick={() => changePage(1)} className='tvList_pagesBtn_btn'>{changePagePopular + 1}</button>}
                    {(changePagePopular < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='tvList_pagesBtn_btn'>{changePagePopular + 2}</button>}
                    {(changePagePopular < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='tvList_pagesBtn_btn'>{changePagePopular + 3}</button>}            
            </section>
        </main>
    );
};

export default TvPopular;