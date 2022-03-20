import React, { useState, useEffect } from 'react';
import TvCard from '../AppComponents/TvCard';
import { v4 as uuidv4 } from 'uuid';

const TvList = () => {

    const [tvDatasList, setTvDatasList] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/discover/tv?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&without_genres=16&sort_by=popularity.desc&page=1&vote_count.gte=1000&include_null_first_air_dates=false')
        .then(res => res.json())
        .then(datas => {
            let arr = [];
            let item;
            console.log(datas.results);
            for (let i = 0; i < datas.results.length;i++) {
                item = {
                    title : datas.results[i].name,
                    poster : datas.results[i].poster_path,
                    overview : datas.results[i].overview,
                    id: uuidv4(),
                    tvId : datas.results[i].id
                };
                arr.push(item)
            }
            console.log(arr);
            setTvDatasList(arr);
        })
    },[])

    return (
        <main className='tvList'>
            <ul>
                {tvDatasList.map((el) => {
                return  <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} />
                })}   
            </ul>
        </main>
    );
};

export default TvList;