import React, { useEffect, useState } from 'react';
import TvNavBar from '../AppComponents/TvNavBar';
import { v4 as uuidv4 } from 'uuid';
import TvCard from '../AppComponents/TvCard';

const TvHome = () => {

    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [datasTvSearch, setDatasTvSearch] = useState([]);

    useEffect(() => {

        console.log(searchValue);
            fetch('https://api.themoviedb.org/3/search/tv?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=' + searchValue + '&page=1&include_adult=false')
            .then(res => res.json())
            .then(datas => {
                if (datas.results) {
                    let arr = [];
                    let item;
                    for (let i = 0;i < datas.results.length;i++) {
                        item = {
                            title : datas.results[i].name,
                            id: uuidv4(),
                            poster: datas.results[i].poster_path,
                            tvId: datas.results[i].id,
                            overview : datas.results[i].overview
                        }
                        arr.push(item)
                    }
                    setDatasTvSearch(arr); 
                }
            })     
    },[searchValue])

    const searchTv = (e) => {
        e.preventDefault();
        setSearchValue(inputValue);
        setInputValue("");
    }

    return (
        <main className='tvHome'>
            <TvNavBar /> 
            <h1 className='tvHome_title'>SERIE TV</h1>
            <div className="tvHome_separator"></div>
            <form className='movieHome_form' onSubmit={searchTv}>
                <label>
                    Rechercher une serie
                    <input className='tvHome_form_inputTxt' type="text" name="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </label>
                <input className='tvHome_form_btn' type="submit"/>
            </form>  
            {}
            <ul>
                {datasTvSearch.map((el) => {
                    return  <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} fromHome={true} />
                })}
            </ul>
        </main>
    );
};

export default TvHome;