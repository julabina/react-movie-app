import React, { useEffect, useState } from 'react';
import EpisodeModal from './EpisodeModal';

const TvEpisode = (props) => {

    const [episodeData, setEpisodeData] = useState([]);

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + props.serieId + '/season/' + props.season + '/episode/' + props.episodeNumber + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
        .then(res => res.json())
        .then(data => {
           let item = {
               airDate : data.air_date,
               title : data.name,
               overview : data.overview,
               vote : Math.round(data.vote_average * 10)/10,
               background : "https://image.tmdb.org/t/p/w500" + data.still_path
           }
           setEpisodeData(item);
        }) 
    },[])
        
    return (
        <li>
            <div className="episodesCont">
                <div className="episodesCont_cont">
                    <div className="episodesCont_cont_number"><p>{props.episodeNumber}</p></div>
                    <p className='episodesCont_cont_title'>{episodeData.title}</p>
                </div>
                <EpisodeModal title={episodeData.title} overview={episodeData.overview} vote={episodeData.vote} background={episodeData.background} airDate={episodeData.airDate} episodeNumber={props.episodeNumber} />
                <p className='episodesCont_vote'>{episodeData.vote}</p>
            </div>
        </li>
    );
};

export default TvEpisode;