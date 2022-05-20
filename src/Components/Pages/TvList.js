import React, { useState, useEffect } from 'react';
import TvCard from '../AppComponents/TvCard';
import { v4 as uuidv4 } from 'uuid';
import TvNavBar from '../AppComponents/TvNavBar';

const TvList = () => {

    const [tvDataList, setTvDataList] = useState([]);
    const [tvListOption, setTvListOption] = useState(["release_date", "desc", 1]);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&without_genres=16&sort_by=' + tvListOption[0] + '.' + tvListOption[1] + '&page=' + tvListOption[2] + '&vote_count.gte=1000&include_null_first_air_dates=false')
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
                arr.push(item)
            }
            setTotalPages(data.total_pages);
            setTvDataList(arr);
        })
    },[tvListOption])

    const sortList = (value) => {
        if (tvListOption[0] !== value) {
            let newArr = [];
            newArr.push(value);
            newArr.push(tvListOption[1]);
            newArr.push(tvListOption[2]);
            setTvListOption(newArr);
        }   
    }
    
    const sortReverse = (value) => {
        if (tvListOption[1] !== value) {
            let newArr = [];
            newArr.push(tvListOption[0]);
            newArr.push(value);
            newArr.push(tvListOption[2]);
            setTvListOption(newArr);
        }
    }

    const changePage = (val) => {
        let numb = tvListOption[2];
        numb = numb + val;
        let newArr = [];
        newArr.push(tvListOption[0]);
        newArr.push(tvListOption[1]);
        newArr.push(numb); 
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
        setTvListOption(newArr);
    }

    return (
        <main className='tvList'>
            <TvNavBar />
            <section className="tvList_options">
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
                {tvDataList.map((el) => {
                return  <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} />
                })}   
            </ul>
            <section className="tvList_pagesBtn">
                {(tvListOption[2] !== 1) && <button onClick={() => changePage(-1)} className='tvList_pagesBtn_btn'>{tvListOption[2] - 1}</button>}
                <button className='tvList_pagesBtn_btn tvList_pagesBtn_btn--active'>{tvListOption[2]}</button>             
                {(tvListOption[2] <  totalPages) && <button onClick={() => changePage(1)} className='tvList_pagesBtn_btn'>{tvListOption[2] + 1}</button>}
                {(tvListOption[2] < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='tvList_pagesBtn_btn'>{tvListOption[2] + 2}</button>}
                {(tvListOption[2] < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='tvList_pagesBtn_btn'>{tvListOption[2] + 3}</button>}            
            </section>
        </main>
    );
};

export default TvList;