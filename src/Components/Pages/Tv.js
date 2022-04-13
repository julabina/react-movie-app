import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TvNavBar from '../AppComponents/TvNavBar';
import TvSeason from '../AppComponents/TvSeason';

const Tv = () => {

    const params = useParams();

    const [dataTvShow, setDataTvShow] = useState([]);
    const [seasonData, setSeasonData] = useState([]);
    const [tvBDrop, setTvBDrop] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
        .then(res => res.json())
        .then(data => {
            let tvGenres = [];
            let creators = [];
            let originCountry = [];
            let seas = [];
            let seasonItem;
            let count = 0;
            for (let i = 0; i < data.genres.length;i++) {
                tvGenres.push(data.genres[i].name + " ");
            }
            for (let i = 0; i < data.created_by.length;i++) {
                (i === 0) ? creators.push(data.created_by[i].name) : creators.push(', ' + data.created_by[i].name);     
            }
            if (creators[0] === undefined) {
                creators = undefined 
            } 
            for (let i = 0; i < data.origin_country.length;i++) {
                (i === 0) ? originCountry.push(data.origin_country[i]) : originCountry.push(', ' + data.origin_country[i]);     
            }
            for (let i = 0; i < data.seasons.length;i++) {
                if (data.seasons[i].name !== "Épisodes spéciaux") {
                    count++;
                    seasonItem = {
                        serieId : data.id,
                        id : uuidv4(),
                        name: data.seasons[i].name,
                        airDate : data.seasons[i].air_date,
                        overview: data.seasons[i].overview,
                        poster: "https://image.tmdb.org/t/p/w200" + data.seasons[i].poster_path,
                        season : count
                    };
                    seas.push(seasonItem);
                }
            }
            let item = {
                title : data.name,
                createdBy : creators,
                firstDiff : data.first_air_date,
                genres : tvGenres,
                origin : originCountry,
                networks : data.networks,
                inProd : data.in_production,
                status : data.status,
                overview : data.overview,
                poster: "https://image.tmdb.org/t/p/w300" + data.poster_path,
                vote: data.vote_average
            }
            setSeasonData(seas);
            setTvBDrop("https://image.tmdb.org/t/p/original" + data.backdrop_path);
            setDataTvShow(item);
        })
    },[])

    return (
        <main>
            <TvNavBar />
            <section className='tvBackdrop' style={{
                backgroundImage: 'url("' + tvBDrop + '")'
            }} >
                <div className="tvBackdrop_container">
                    <div className="tvBackdrop_container_poster">
                        <img src={dataTvShow.poster} alt={'Affiche de la serie '  + dataTvShow.title} />
                    </div>
                    <div className="tvBackdrop_container_infos">
                        <div className="tvBackdrop_container_infos_top">
                            <h1>{dataTvShow.title}</h1>
                            {(dataTvShow.createdBy !== undefined) && <p>Une serie de {dataTvShow.createdBy}</p>}
                        </div>
                        <div className="tvBackdrop_container_infos_bottom">
                            <div className="tvBackdrop_container_infos_bottom_left">
                                <p className="tvBackdrop_container_infos_bottom_left_origin">{dataTvShow.origin} -</p>
                                <p className="tvBackdrop_container_infos_bottom_left_genres">{dataTvShow.genres}</p>
                            </div>
                            <p className="tvBackdrop_container_infos_bottom_note">{dataTvShow.vote}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tvInfosContainer">
                <div className="tvInfosContainer_release">
                    <p>1ere diffusion : <span>{dataTvShow.firstDiff}</span></p>
                </div>
                <div className="tvInfosContainer_overview">
                    <div className="tvInfosContainer_overview_header"><p className='tvInfosContainer_overview_header_title'>Synopsis</p></div>
                    <p className='tvInfosContainer_overview_txt'>{dataTvShow.overview}</p>
                </div>
            </section>
            <ul className='seasonList'>
                {seasonData.map((el) => {
                    return (
                     <TvSeason name={el.name} id={el.id} key={el.id} serieId={el.serieId} diff={el.airDiff} overview={el.overview} poster={el.poster} season={el.season} />
                    )
                })}
            </ul>
        </main>
    );
};

export default Tv;