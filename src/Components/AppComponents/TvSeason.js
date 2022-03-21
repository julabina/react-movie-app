import React, { useEffect, useState } from 'react';
import SeasonModalOverview from './SeasonModalOverview';

const TvSeason = (props) => {

    const [testt, setTestt] = useState();

    useEffect (() => {
    fetch('https://api.themoviedb.org/3/tv/' + props.serieId + '/season/' + props.season + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
    .then(res => res.json())
    .then(datas => {
        setTestt(datas.overview)
    })
},[])

    return (
        <li className='tvSeasonCard' key={props.id}>
            <div className="tvSeasonCard_title">
                <h2>{props.name}</h2>
            </div>
            <div className="tvSeasonCard_main">
                <img src={props.poster} alt={"affiche de la " + props.name} />
                <div className="tvSeasonCard_main_infos">
                  {(props.overview !== "") && <SeasonModalOverview overview={props.overview} />}
                </div>
            </div>
        </li>
    );
};

export default TvSeason;