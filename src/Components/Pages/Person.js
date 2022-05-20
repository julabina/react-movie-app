import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from '../AppComponents/MovieCard';
import TvCard from '../AppComponents/TvCard';

const Person = () => {

    const params = useParams();
    const [personData, setPersonData] = useState({});
    const [creditsData, setCreditsData] = useState([]);
    const [creditTvData, setCreditTvData] = useState([]);
    const [toggleMedia, setToggleMedia] = useState(true);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        
        Promise.all([
            fetch('https://api.themoviedb.org/3/person/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/person/' + params.id + '/movie_credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/person/' + params.id + '/tv_credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json())
        ])
        .then(data => {
            console.log(data);
            let role = '';
            if(data[0].known_for_department === "Acting") {
                if (data[0].gender === 1) {
                    role = "Actrice";
                } else if (data[0].gender === 2) {
                    role = "Acteur";
                } 
            } else {
                role = data[0].known_for_department;   
            }
            let item = {
                names : data[0].name,
                birthday: data[0].birthday,
                deathday: data[0].deathday,
                bio: data[0].biography,
                gender: data[0].gender,
                placeOfBirth: data[0].place_of_birth,
                profile: "https://image.tmdb.org/t/p/w200" + data[0].profile_path,
                role: role
            }
            let creditArr = [];
            for(let i = 0; i < data[1].cast.length; i++) {
                let movieItem = {
                    movieId : data[1].cast[i].id,
                    title : data[1].cast[i].title,
                    release : data[1].cast[i].release_date,
                    img : data[1].cast[i].poster_path,
                    overview : data[1].cast[i].overview,
                    id : uuidv4()
                }
                creditArr.push(movieItem);
            }
            let creditTvArr = [];
            for (let i = 0; i < data[2].cast.length; i++) {
                let itemTv = {
                    serieId : data[2].cast[i].id,
                    title : data[2].cast[i].title,
                    img : data[2].cast[i].poster_path,
                    overview : data[2].cast[i].overview,
                    id : uuidv4()
                };
                creditTvArr.push(itemTv);
            }
            setCreditTvData(creditTvArr);
            setCreditsData(creditArr);
            setPersonData(item);
        })
    },[]);

    const switchCredit = () => {
        setToggleMedia(!toggleMedia);
    }

    return (
        <main className='person'>
            <section className='person_top'>
                <img className='person_top_profile' src={personData.profile} alt="" />
                <div className="person_top_infos">
                    <h2>{personData.names}</h2>
                    <div className="person_top_infos_bot">
                        <div className="person_top_infos_bot_left">
                            <p>{personData.gender === 1 ? "née le " : "né le "}{personData.birthday} à {personData.placeOfBirth}</p>
                            {personData.deathday !== null && "Décédé(e) le " + personData.deathday}
                        </div>
                        {personData.role}
                    </div>
                </div>
            </section>
            <section className="person_bio">
                <p>{personData.bio}</p>
            </section>
            <section className='personCredit'>
                <div className='personCredit_switch'>
                    <button className={toggleMedia ? "personCredit_switch_btn personCredit_switch_btn--actif" : "personCredit_switch_btn"} onClick={switchCredit}>Films</button>
                    <button className={toggleMedia ? "personCredit_switch_btn" : "personCredit_switch_btn personCredit_switch_btn--actif"} onClick={switchCredit}>Series</button>
                </div>
                <ul>

                    {toggleMedia ? 

                    creditsData.map(el => {
                        return (
                            <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                            poster={el.img} overview={el.overview} movieId={el.movieId} />
                            )
                    })

                    :

                    creditTvData.map(el => {
                        return (
                            <TvCard title={el.title} key={el.id} id={el.id} poster={el.img} overview={el.overview} tvId={el.serieId} />
                            )
                    })

                }
                </ul>
            </section>
        </main>
    );
};

export default Person;