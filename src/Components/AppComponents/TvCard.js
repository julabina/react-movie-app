import React from 'react';

const TvCard = (props) => {
    return (
        <li key={props.id} className='tvCard'>
            <div className="tvCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche de la serie " + props.title} />
                : <div className="tvCard_poster_noImg"><p>Pas d'aperçu</p></div>
                }
            </div>
            <div className='tvCard_infos'>
                {props.fromHome ? <a href={'./tv/ref_=' + props.tvId}><h2>{props.title}</h2></a> : <a href={'./ref_=' + props.tvId}><h2>{props.title}</h2></a>}
                <p>{props.overview}</p>
            </div>
        </li>
    );
};

export default TvCard;