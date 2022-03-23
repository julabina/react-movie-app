import React from 'react';

const MovieCard = (props) => {
    return (
        <li key={props.id} className='movieCard'>
            <div className="movieCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche du film" + props.title} />
                : <div className="tvCard_poster_noImg"><p>Pas d'aperçu</p></div>
                }
            </div>
            <div className='movieCard_infos'>
                {props.fromHome ? <a href={'./movie/ref_=' + props.movieId}><h2>{props.title}</h2></a> : <a href={'./ref_=' + props.movieId}><h2>{props.title}</h2></a>}
                <h3>{props.release}</h3>
                <p>{props.overview}</p>
            </div>
        </li>
    );
};

export default MovieCard;