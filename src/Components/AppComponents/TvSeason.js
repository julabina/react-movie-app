import React, { useEffect, useState } from 'react';
import TvEpisode from './TvEpisode';
import { v4 as uuidv4 } from 'uuid';

const TvSeason = (props) => {

    const [dataEpisode, setDataEpisode] = useState([]);
    const [toggleEpisodeShow, setToggleEpisodeShow] = useState(false);

    useEffect (() => {
    fetch('https://api.themoviedb.org/3/tv/' + props.serieId + '/season/' + props.season + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
    .then(res => res.json())
    .then(datas => {
        console.log(datas);
        let item ;
        let arr = [];
        for (let i = 0; i < datas.episodes.length;i++) {
            item = {
                serieId : props.serieId,
                season : props.season,
                episodeNumber : datas.episodes[i].episode_number,
                id : uuidv4()
            }
            arr.push(item);
        }
        setDataEpisode(arr);
    })
},[])

const toggleEpisodeHide = () => {
    setToggleEpisodeShow(!toggleEpisodeShow);
}

    return (
        <li className='tvSeasonCard' key={props.id}>
            <div className="tvSeasonCard_title">
                <h2>{props.name}</h2>
            </div>
            <div className="tvSeasonCard_main">
                <img src={props.poster} alt={"affiche de la " + props.name} />
                <div className="tvSeasonCard_main_cont">
                    <div className="tvSeasonCard_main_cont_infos">
                        {props.overview}
                    </div>
                    <div onClick={toggleEpisodeHide} className="tvSeasonCard_main_cont_episodeShow">
                        <p>Voir les épisodes</p>
                    </div>
                </div>
            </div>
            <ul className={toggleEpisodeShow ? "tvSeasonCard_episodes" : "tvSeasonCard_episodes tvSeasonCard_episodes--hidden"}>
                {dataEpisode.map((el) => {
                    return (
                        <TvEpisode key={el.id} id={el.id} serieId={el.serieId} season={el.season} episodeNumber={el.episodeNumber} />
                        )
                })}   
            </ul>
        </li>
    );
};

export default TvSeason;