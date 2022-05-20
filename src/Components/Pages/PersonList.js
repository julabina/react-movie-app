import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PersonCard from '../AppComponents/PersonCard';

const PersonList = () => {

    const [actualPage, setActualPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [personData, setPersonData] =  useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('https://api.themoviedb.org/3/person/popular?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&page=' + actualPage)
        .then(res => res.json())
        .then(data => {
            let arr = [];
            for(let i = 0; i < data.results.length; i++) {
                let item = {
                    names: data.results[i].name,
                    id: uuidv4(),
                    profile: data.results[i].profile_path,
                    personId: data.results[i].id,
                    gender: data.results[i].gender
                }
                arr.push(item);
            }
            setTotalPages(data.total_pages)
            setPersonData(arr);
        })
    }, [actualPage]);

    const changePage = (val) => {
        let numb = actualPage;
        numb = numb + val;
        setActualPage(numb);
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        });
    }

    return (
        <main className='personList'>
            <h2 className='personList_title'>Peoples</h2>
            <ul>
                {personData.map(el => {
                        return <PersonCard names={el.names} key={el.id} profile={el.profile} personId={el.personId} gender={el.gender} />
                })}
            </ul>
                <section className="movieList_pagesBtn">
                    {(actualPage !== 1) && <button onClick={() => changePage(-1)} className='movieList_pagesBtn_btn'>{actualPage - 1}</button>}
                    <button className='movieList_pagesBtn_btn movieList_pagesBtn_btn--active'>{actualPage}</button>             
                    {(actualPage <  totalPages) && <button onClick={() => changePage(1)} className='movieList_pagesBtn_btn'>{actualPage + 1}</button>}
                    {(actualPage < (totalPages - 1) ) && <button onClick={() => changePage(2)} className='movieList_pagesBtn_btn'>{actualPage + 2}</button>}
                    {(actualPage < (totalPages - 2) ) && <button onClick={() => changePage(3)} className='movieList_pagesBtn_btn'>{actualPage + 3}</button>}            
                </section>
        </main>
    );
};

export default PersonList;