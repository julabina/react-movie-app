import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import TvNavBar from '../AppComponents/TvNavBar';
import TvSeason from '../AppComponents/TvSeason';
import TvCard from '../AppComponents/TvCard';

const Tv = () => {

    const params = useParams();

    const [dataTvShow, setDataTvShow] = useState([]);
    const [seasonData, setSeasonData] = useState([]);
    const [tvBDrop, setTvBDrop] = useState();
    const [castData, setCastData] = useState([]);
    const [similarData, setSimilarData] = useState([]);
    const [toggleCastAll, setToggleCastAll] = useState(false);

    useEffect(() => {
        Promise.all([
            fetch('https://api.themoviedb.org/3/tv/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/tv/' + params.id + '/credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/tv/' + params.id + '/similar?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR&page=1').then(res => res.json())
        ])
        .then(data => {
            console.log(data);
            let tvGenres = [];
            let creators = [];
            let originCountry = [];
            let seas = [];
            let seasonItem;
            let count = 0;
            for (let i = 0; i < data[0].genres.length;i++) {
                tvGenres.push(data[0].genres[i].name + " ");
            }
            for (let i = 0; i < data[0].created_by.length;i++) {
                (i === 0) ? creators.push(data[0].created_by[i].name) : creators.push(', ' + data[0].created_by[i].name);     
            }
            if (creators[0] === undefined) {
                creators = undefined 
            } 
            for (let i = 0; i < data[0].origin_country.length;i++) {
                (i === 0) ? originCountry.push(data[0].origin_country[i]) : originCountry.push(', ' + data[0].origin_country[i]);     
            }
            for (let i = 0; i < data[0].seasons.length;i++) {
                if (data[0].seasons[i].name !== "Épisodes spéciaux") {
                    count++;
                    seasonItem = {
                        serieId : data[0].id,
                        id : uuidv4(),
                        name: data[0].seasons[i].name,
                        airDate : data[0].seasons[i].air_date,
                        overview: data[0].seasons[i].overview,
                        poster: "https://image.tmdb.org/t/p/w200" + data[0].seasons[i].poster_path,
                        season : count
                    };
                    seas.push(seasonItem);
                }
            };
            let item = {
                title : data[0].name,
                createdBy : creators,
                firstDiff : data[0].first_air_date,
                genres : tvGenres,
                origin : originCountry,
                networks : data[0].networks,
                inProd : data[0].in_production,
                status : data[0].status,
                overview : data[0].overview,
                poster: "https://image.tmdb.org/t/p/w300" + data[0].poster_path,
                vote: data[0].vote_average
            }
            let castArr = [];
            for(let i = 0; i < data[1].cast.length; i++) {
                let castItem = {
                    castName : data[1].cast[i].name,
                    character: data[1].cast[i].character,
                    peopleId: data[1].cast[i].id,
                    profile: "https://image.tmdb.org/t/p/w200" + data[1].cast[i].profile_path,
                    id: uuidv4(),
                    order : data[1].cast[i].order
                }
                castArr.push(castItem);
            };
            let similarArr = [];
            for (let i = 0; i < 9; i++) {
                let itemSimilar = {
                    serieId : data[2].results[i].id,
                    title : data[2].results[i].title,
                    img : data[2].results[i].poster_path,
                    overview : data[2].results[i].overview,
                    id : uuidv4()
                };
                similarArr.push(itemSimilar);
            };
            setSimilarData(similarArr);
            setCastData(castArr);
            setSeasonData(seas);
            setTvBDrop("https://image.tmdb.org/t/p/original" + data[0].backdrop_path);
            setDataTvShow(item);
        })
    },[])

    const toggleCast = () => {
        setToggleCastAll(!toggleCastAll);
    }

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
            <section className='castSection'>
                <div className="castSection_title">
                    <h2 className=''>Casting de la serie</h2>
                </div>
                <div className="castSection_container">
                {castData.map(el => {
                    if (toggleCastAll) {
                            return <Link to={'/person/ref_=' + el.peopleId} className="castSection_container_casting" key={el.id}>
                                        <div className="castSection_container_casting_img">
                                            <img src={el.profile} alt={'photo de ' + el.castName} />
                                        </div>
                                        <div className="castSection_container_casting_infos">
                                            <h3>{el.castName}</h3>
                                            <h4>{el.character}</h4>
                                        </div>
                                    </Link>
                    } else {
                        if (el.order < 8) {
                            return <Link to={'/person/ref_=' + el.peopleId} className="castSection_container_casting" key={el.id}>
                                        <div className="castSection_container_casting_img">
                                            <img src={el.profile} alt={'photo de ' + el.castName} />
                                        </div>
                                        <div className="castSection_container_casting_infos">
                                            <h3>{el.castName}</h3>
                                            <h4>{el.character}</h4>
                                        </div>
                                    </Link>
                        }
                    }
                })}
                </div>
                <div className="castSection_container_btnCont">
                    {
                        toggleCastAll ? 
                        <button onClick={toggleCast} className='castSection_container_btnCont_btn'>Voir moins</button>
                        :
                        <button onClick={toggleCast} className='castSection_container_btnCont_btn'>Tout voir</button>
                    }
                </div>
            </section>
            <section className='similarSection'>
                <div className="similarSection_title">
                    <h2 className=''>Series similaires</h2>
                </div>
                    <ul>
                        {similarData.map(el => {
                            return (
                                <TvCard fromTv={true} title={el.title} key={el.id} id={el.id} poster={el.img} overview={el.overview} tvId={el.serieId} />
                                )
                        })}
                    </ul>
            </section>
        </main>
    );
};

export default Tv;