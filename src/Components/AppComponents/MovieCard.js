import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
    return (
        <>
        {(props.fromMovie === true)
        ?
        <a href={"/movie/ref_=" + props.movieId}>
             
        <li key={props.id} className='movieCard'>
            <div className="movieCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche du film" + props.title} />
                : <div className="tvCard_poster_noImg"><p>Pas d'aperçu</p></div>
            }
            </div>
            <div className='movieCard_infos'>
                <h2>{props.title}</h2>
                <h3>{props.release}</h3>
                <p>{props.overview}</p>
            </div>
        </li>        
        </a>
        :

        <Link to={"/movie/ref_=" + props.movieId}>     
        <li key={props.id} className='movieCard'>
            <div className="movieCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche du film" + props.title} />
                : <div className="tvCard_poster_noImg"><p>Pas d'aperçu</p></div>
            }
            </div>
            <div className='movieCard_infos'>
                <h2>{props.title}</h2>
                <h3>{props.release}</h3>
                <p>{props.overview}</p>
            </div>
        </li> 
        </Link>
        }
        
        </>
    );
};

export default MovieCard;