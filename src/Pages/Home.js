import React, { useState, useEffect } from 'react';
import HomeCard from '../Componants/HomeCard';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {

    const [dataHomeList, setDataHomeList] = useState([]);
    
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=55bba68332de33aa4f9ca07572929f92&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
        .then(res => res.json())
        .then(datas => {
            console.log(datas);
            let arr = [];
            let item;
            for (let i = 0; i < datas.results.length;i++) {
                item = {
                    title : datas.results[i].title,
                    release : datas.results[i].release_date,
                    img : datas.results[i].poster_path,
                    overview : datas.results[i].overview,
                    id : uuidv4()
                };
                arr.push(item);
            }
            console.log(arr);
            setDataHomeList(arr);
        })
    },[])
    
    return (
        <div className='home'>
                
              <ul>
              {dataHomeList.map((el) => {
                 return (
                      <HomeCard title={el.title} key={el.id} id={el.id} release={el.release}
                      poster={el.img} overview={el.overview} />
                 )
                    })}      
            </ul>
        </div>
    );
};

export default Home;