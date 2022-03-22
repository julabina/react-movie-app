import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TvNavBar from '../AppComponents/TvNavBar';
import TvSeason from '../AppComponents/TvSeason';

const Tv = () => {

    const params = useParams();

    const [datasTvShow, setDatasTvShow] = useState([]);
    const [seasonDatas, setSeasonDatas] = useState([]);
    const [tvBDrop, setTvBDrop] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
        .then(res => res.json())
        .then(datas => {
            let tvGenres = [];
            let creators = [];
            let originCountry = [];
            let seas = [];
            let seasonItem;
            let count = 0;
            for (let i = 0; i < datas.genres.length;i++) {
                tvGenres.push(datas.genres[i].name + " ");
            }
            for (let i = 0; i < datas.created_by.length;i++) {
                (i === 0) ? creators.push(datas.created_by[i].name) : creators.push(', ' + datas.created_by[i].name);     
            }
            if (creators[0] === undefined) {
                creators = undefined 
            } 
            for (let i = 0; i < datas.origin_country.length;i++) {
                (i === 0) ? originCountry.push(datas.origin_country[i]) : originCountry.push(', ' + datas.origin_country[i]);     
            }
            for (let i = 0; i < datas.seasons.length;i++) {
                if (datas.seasons[i].name !== "Épisodes spéciaux") {
                    count++;
                    seasonItem = {
                        serieId : datas.id,
                        id : uuidv4(),
                        name: datas.seasons[i].name,
                        airDate : datas.seasons[i].air_date,
                        overview: datas.seasons[i].overview,
                        poster: "https://image.tmdb.org/t/p/w200" + datas.seasons[i].poster_path,
                        season : count
                    };
                    seas.push(seasonItem);
                }
            }
            let item = {
                title : datas.name,
                createdBy : creators,
                firstDiff : datas.first_air_date,
                genres : tvGenres,
                origin : originCountry,
                networks : datas.networks,
                inProd : datas.in_production,
                status : datas.status,
                overview : datas.overview,
                poster: "https://image.tmdb.org/t/p/w300" + datas.poster_path,
                vote: datas.vote_average
            }
            setSeasonDatas(seas);
            setTvBDrop("https://image.tmdb.org/t/p/original" + datas.backdrop_path);
            setDatasTvShow(item);
        })
    },[])

    return (
        <main>
            <TvNavBar />
            <div className='tvBackdrop' style={{
                backgroundImage: 'url("' + tvBDrop + '")'
            }} >
                <div className="tvBackdrop_container">
                    <div className="tvBackdrop_container_poster">
                        <img src={datasTvShow.poster} alt={'Affiche de la serie '  + datasTvShow.title} />
                    </div>
                    <div className="tvBackdrop_container_infos">
                        <div className="tvBackdrop_container_infos_top">
                            <h1>{datasTvShow.title}</h1>
                            {(datasTvShow.createdBy !== undefined) && <p>Une serie de {datasTvShow.createdBy}</p>}
                        </div>
                        <div className="tvBackdrop_container_infos_bottom">
                            <div className="tvBackdrop_container_infos_bottom_left">
                                <p className="tvBackdrop_container_infos_bottom_left_origin">{datasTvShow.origin} -</p>
                                <p className="tvBackdrop_container_infos_bottom_left_genres">{datasTvShow.genres}</p>
                            </div>
                            <p className="tvBackdrop_container_infos_bottom_note">{datasTvShow.vote}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="tvInfosContainer">
                <div className="tvInfosContainer_release">
                    <p>1ere diffusion : <span>{datasTvShow.firstDiff}</span></p>
                </div>
                <div className="tvInfosContainer_overview">
                    <div className="tvInfosContainer_overview_header"><p className='tvInfosContainer_overview_header_title'>Synopsis</p></div>
                    <p className='tvInfosContainer_overview_txt'>{datasTvShow.overview}</p>
                </div>
            </div>
            <ul>
                {seasonDatas.map((el) => {
                    return (
                     <TvSeason name={el.name} id={el.id} key={el.id} serieId={el.serieId} diff={el.airDiff} overview={el.overview} poster={el.poster} season={el.season} />
                    )
                })}
            </ul>
        </main>
    );
};

export default Tv;