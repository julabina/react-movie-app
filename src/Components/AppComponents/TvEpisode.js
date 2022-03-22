import React, { useEffect, useState } from 'react';
import EpisodeModal from './EpisodeModal';

const TvEpisode = (props) => {

    const [episodeDatas, setEpisodeDatas] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + props.serieId + '/season/' + props.season + '/episode/' + props.episodeNumber + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
        .then(res => res.json())
        .then(datas => {
           let item = {
               airDate : datas.air_date,
               title : datas.name,
               overview : datas.overview,
               vote : datas.vote_average,
               background : "https://image.tmdb.org/t/p/w500" + datas.still_path
           }
           setEpisodeDatas(item);
        }) 
    },[])
        
    return (
        <li>
            <div className="episodesCont">
                <div className="episodesCont_number"><p>{props.episodeNumber}</p></div>
                <p className='episodesCont_title'>{episodeDatas.title}</p>
                <EpisodeModal title={episodeDatas.title} overview={episodeDatas.overview} vote={episodeDatas.vote} background={episodeDatas.background} airDate={episodeDatas.airDate} episodeNumber={props.episodeNumber} />
                <p className='episodesCont_vote'>{episodeDatas.vote}</p>
            </div>
        </li>
    );
};

export default TvEpisode;