import React, { useEffect, useState } from 'react';
import TvNavBar from '../AppComponents/TvNavBar';
import { v4 as uuidv4 } from 'uuid';
import TvCard from '../AppComponents/TvCard';

const TvHome = () => {

    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [dataTvSearch, setDataTvSearch] = useState([]);

    useEffect(() => {

        console.log(searchValue);
            fetch('https://api.themoviedb.org/3/search/tv?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=' + searchValue + '&page=1&include_adult=false')
            .then(res => res.json())
            .then(data => {
                if (data.results) {
                    let arr = [];
                    let item;
                    for (let i = 0;i < data.results.length;i++) {
                        item = {
                            title : data.results[i].name,
                            id: uuidv4(),
                            poster: data.results[i].poster_path,
                            tvId: data.results[i].id,
                            overview : data.results[i].overview
                        }
                        arr.push(item)
                    }
                    setDataTvSearch(arr); 
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
            <h2 className='tvHome_title'>SERIE TV</h2>
            <div className="tvHome_separator"></div>
            <form className='movieHome_form' onSubmit={searchTv}>
                <label>
                    Rechercher une serie
                    <input className='tvHome_form_inputTxt' type="text" name="search" value={inputValue} onChange={(e) => setInputValue(e.target.value)}  autoComplete='off'/>
                </label>
                <input className='tvHome_form_btn' type="submit" value="Rechercher"/>
            </form>  
            {}
            <ul>
                {dataTvSearch.map((el) => {
                    return  <TvCard title={el.title} key={el.id} id={el.id} poster={el.poster} overview={el.overview} tvId={el.tvId} fromHome={true} />
                })}
            </ul>
        </main>
    );
};

export default TvHome;