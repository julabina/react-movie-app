import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Tv = () => {

    const params = useParams();

    const [datasTvShow, setDatasTvShow] = useState([]);
    const [tvBDrop, setTvBDrop] = useState();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/tv/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
        .then(res => res.json())
        .then(datas => {
            console.log(datas);
            let tvGenres = [];
            let creators = [];
            let originCountry = [];
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
                seasons : datas.seasons,
                vote: datas.vote_average
            }
            setTvBDrop("https://image.tmdb.org/t/p/original" + datas.backdrop_path);
            setDatasTvShow(item);
        })
    },[])

    return (
        <main>
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
        </main>
    );
};

export default Tv;