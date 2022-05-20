import React, { useEffect, useState } from 'react';
import TvNavBar from '../AppComponents/TvNavBar';
import { v4 as uuidv4 } from 'uuid';
import TvCard from '../AppComponents/TvCard';

const TvHome = () => {

    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [dataTvSearch, setDataTvSearch] = useState([]);
    const [actualPage, setActualPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        if (actualPage > 0) {
            fetch('https://api.themoviedb.org/3/search/tv?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&query=' + searchValue + '&page=' + actualPage + '&include_adult=false')
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
                    setTotalPages(data.total_pages);
                    setDataTvSearch(arr); 
                }
            })   
        }  
    },[searchValue, actualPage])

    const searchTv = (e) => {
        e.preventDefault();
        setActualPage(1);
        setSearchValue(inputValue);
        setInputValue("");
    }

    const changePage = (val) => {
        let numb = actualPage;
        numb = numb + val; 
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
        setActualPage(numb);
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
            {dataTvSearch.length > 0 && 
                <section className="movieList_pagesBtn">
                    {(actualPage !== 1) && <button onClick={() => changePage(-1)} className='movieList_pagesBtn_btn'>{actualPage - 1}</button>}
                    <button className='movieList_pagesBtn_btn movieList_pagesBtn_btn--active'>{actualPage}</button>             
                    {(actualPage <  totalPages) && <button onClick={() => changePage(1)} className='movieList_pagesBtn_btn'>{actualPage + 1}</button>}
                    {(actualPage < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='movieList_pagesBtn_btn'>{actualPage + 2}</button>}
                    {(actualPage < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='movieList_pagesBtn_btn'>{actualPage + 3}</button>}            
                </section>
            }
        </main>
    );
};

export default TvHome;