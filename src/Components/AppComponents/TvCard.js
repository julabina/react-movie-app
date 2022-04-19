import React from 'react';
import { Link } from 'react-router-dom';

const TvCard = (props) => {
    return (
        <>
        {(props.fromTv === true)
        ?
        <a href={"/tv/ref_=" + props.tvId}>
        <li key={props.id} className='tvCard'>
            <div className="tvCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche de la serie " + props.title} />
                : <div className="tvCard_poster_noImg"><p>Pas d'aperçu</p></div>
            }
            </div>
            <div className='tvCard_infos'>
                <h2>{props.title}</h2>
                <p>{props.overview}</p>
            </div>
        </li>
        </a>

        :
        <Link to={"/tv/ref_=" + props.tvId}>
        <li key={props.id} className='tvCard'>
            {
                props.fromHome &&
                <p className='tvCard_tvLogo'>TV</p>
            }
            <div className="tvCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche de la serie " + props.title} />
                : <div className="tvCard_poster_noImg"><p>Pas d'aperçu</p></div>
            }
            </div>
            <div className='tvCard_infos'>
                <h2>{props.title}</h2>
                <p>{props.overview}</p>
            </div>
        </li>
        </Link>
}
        </>
    );
};

export default TvCard;