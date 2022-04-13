import React from 'react';

const PersonCard = (props) => {
    return (
        <>
        <a href={props.fromHome ? ('./person/ref_=' + props.personId) : ('./ref_=' + props.personId)}>
        <li key={props.id} className='personCard'>
            <div className="personCard_poster">
                {(props.poster !== null) ? 
                <img src={"https://image.tmdb.org/t/p/w200" + props.profile} alt={"portrait de " + props.names} />
                : <div className="personCard_poster_noImg"><p>Pas d'aperçu</p></div>
            }
            </div>
            <div className='personCard_infos'>
                <h2>{props.names}</h2>
                <h3>{props.gender === 1 ? "Femme" : "Homme"}</h3>
            </div>
        </li></a>
        </>
    );
};

export default PersonCard;