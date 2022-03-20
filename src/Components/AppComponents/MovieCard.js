import React from 'react';

const MovieCard = (props) => {
    return (
        <li key={props.id} className='movieCard'>
            <div className="movieCard_poster">
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche du film" + props.title} />
            </div>
            <div className='movieCard_infos'>
                <a href={'./movie/ref_=' + props.movieId}><h2>{props.title}</h2></a>
                <h3>{props.release}</h3>
                <p>{props.overview}</p>
            </div>
        </li>
    );
};

export default MovieCard;