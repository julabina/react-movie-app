import React, { useState, useEffect } from 'react';
import TvCard from '../AppComponents/TvCard';
import { v4 as uuidv4 } from 'uuid';
import TvNavBar from '../AppComponents/TvNavBar';

const TvTopRated = () => {

    const [dataTvTopRated, setDataTvTopRated] = useState([]);
    const [changePageTopRated, setChangePageTopRated] = useState(1);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/top_rated?api_key=' + process.env.REACT_APP_API_KEY + '&page=' + changePageTopRated + '&language=fr-FR')
        .then(res => res.json())
        .then(datas => {
            let arr = [];
            let item;
            for (let i = 0; i < datas.results.length;i++) {
                item = {
                    title : datas.results[i].name,
                    poster : datas.results[i].poster_path,
                    overview : datas.results[i].overview,
                    id: uuidv4(),
                    tvId : datas.results[i].id
                };
                arr.push(item);
            }
            setTotalPages(datas.total_pages);
            setDataTvTopRated(arr);
        })
    },[changePageTopRated])


    const changePage = (val) => {
       let newVal = changePageTopRated + val;
       setChangePageTopRated(newVal);
    }
    return (
        <main className='tvList'> 
            <TvNavBar />
            <div className="tvList_options"></div>
                <ul>
                {dataTvTopRated.map((el) => {
                    return (
                        <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} />
                        )
                        })}      
                </ul>
                <div className="tvList_pagesBtn">
                    {(changePageTopRated !== 1) && <button onClick={() => changePage(-1)} className='tvList_pagesBtn_btn'>{changePageTopRated - 1}</button>}
                    <button className='tvList_pagesBtn_btn tvList_pagesBtn_btn--active'>{changePageTopRated}</button>             
                    {(changePageTopRated <  totalPages) && <button onClick={() => changePage(1)} className='tvList_pagesBtn_btn'>{changePageTopRated + 1}</button>}
                    {(changePageTopRated < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='tvList_pagesBtn_btn'>{changePageTopRated + 2}</button>}
                    {(changePageTopRated < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='tvList_pagesBtn_btn'>{changePageTopRated + 3}</button>}            
            </div>
        </main>
    );
};

export default TvTopRated;