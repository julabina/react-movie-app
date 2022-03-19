import React from 'react';

const HomeCard = (props) => {
    return (
        <li key={props.id} className='homeCard'>
            <div className="homeCard_poster">
                <img src={"https://image.tmdb.org/t/p/w200" + props.poster} alt={"affiche du film" + props.title} />
            </div>
            <div className='homeCard_infos'>
                <h2>{props.title}</h2>
                <h3>{props.release}</h3>
                <p>{props.overview}</p>
            </div>
        </li>
    );
};

export default HomeCard;