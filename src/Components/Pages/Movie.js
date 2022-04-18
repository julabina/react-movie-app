import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieNavBar from '../AppComponents/MovieNavBar';
import { v4 as uuidv4 } from 'uuid';
import MovieCard from '../AppComponents/MovieCard';

const Movie = () => {

    const params = useParams();
    const [movieData, setMovieData] = useState({});
    const [bDrop, setBDrop] = useState();
    const [castData, setCastData] = useState([]);
    const [toggleCastAll, setToggleCastAll] = useState(false);
    const [similarData, setSimilarData] = useState([]);

    useEffect(() => {
        Promise.all ([
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '/credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '/similar?api_key=' + process.env.REACT_APP_API_KEY + '&page=1&language=fr-FR').then(res => res.json())
        ])
        .then(data => {
            console.log(data[2]);
            let director;
            let movieGenre = [];
            for (let i = 0;i < data[1].crew.length;i++) {
                if (data[1].crew[i].job === "Director") {
                    director = data[1].crew[i].name;
                }
            }
            for (let i = 0; i < data[0].genres.length;i++) {
                movieGenre.push(data[0].genres[i].name + " ");
            }
            let runtime = data[0].runtime;
            let h = Math.floor(runtime / 60);
            let m = Math.floor(runtime % 60);
            if (m.length === 1) {
                m = "0" + m; 
            }
           let movieTime = h + "h" + m;
           let collection = null,
           collectionId;
           if (data[0].belongs_to_collection !== null) {
                collection = data[0].belongs_to_collection.name;
                collectionId = data[0].belongs_to_collection.id;
           }

            let item = {
                    genres : movieGenre,
                    runtime : movieTime ,
                    title : data[0].title,
                    overview : data[0].overview,
                    poster : "https://image.tmdb.org/t/p/w300" + data[0].poster_path,
                    release : data[0].release_date,
                    vote : data[0].vote_average,
                    movieDirector : director,
                    collection: collection,
                    collectionId: collectionId
            }
            let castArr = [];
            for(let i = 0; i < data[1].cast.length; i++) {
                let casts = {
                    castName : data[1].cast[i].name,
                    character: data[1].cast[i].character,
                    peopleId: data[1].cast[i].id,
                    profile: "https://image.tmdb.org/t/p/w200" + data[1].cast[i].profile_path,
                    id: uuidv4(),
                    order : data[1].cast[i].order
                };
                castArr.push(casts);
            }
            let similarArr = [],
            itemSimilar;
            for (let i = 0; i < 9; i++) {
                itemSimilar = {
                    movieId : data[2].results[i].id,
                    title : data[2].results[i].title,
                    release : data[2].results[i].release_date,
                    img : data[2].results[i].poster_path,
                    overview : data[2].results[i].overview,
                    id : uuidv4()
                };
                similarArr.push(itemSimilar);
            };
            setSimilarData(similarArr);
            setBDrop("https://image.tmdb.org/t/p/original" + data[0].backdrop_path);
            setMovieData(item);
            setCastData(castArr);
        })
    },[]);

    const toggleCast = () => {
        setToggleCastAll(!toggleCastAll);
    }
    
    return (
        <main>
        <MovieNavBar />
            <section className='movieBackdrop' style={{
                backgroundImage: 'url("' + bDrop + '")'
            }} >
                <div className="movieBackdrop_container">
                    <div className="movieBackdrop_container_poster">
                        <img src={movieData.poster} alt={'affiche du film ' + movieData.title} />
                    </div>
                    <div className="movieBackdrop_container_infos">
                        <div className="movieBackdrop_container_infos_top">
                            <h2>{movieData.title}</h2>
                            {(movieData.movieDirector !== undefined) && <p>Un film de {movieData.movieDirector}</p>}
                        </div>
                        <div className="movieBackdrop_container_infos_bottom">
                            <div className="movieBackdrop_container_infos_bottom_left">
                                <p className="movieBackdrop_container_infos_bottom_left_time">{movieData.runtime}</p>
                                <p className="movieBackdrop_container_infos_bottom_left_genres">{movieData.genres}</p>
                            </div>
                            <p className="movieBackdrop_container_infos_bottom_note">{movieData.vote}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="movieInfosContainer">
                <div className="movieInfosContainer_release">
                    <div>
                        <p>Date de sortie : <span>{movieData.release}</span></p>
                        {movieData.collection !== null && 
                        <div className="movieInfosContainer_release_collection">
                            <p>Collection :</p>
                            <Link to={'/collection/ref_=' + movieData.collectionId}><p className='movieInfosContainer_release_collection_link'>{movieData.collection}</p></Link>
                        </div>
                        }
                    </div>
                </div>
                <div className="movieInfosContainer_overview">
                    <div className="movieInfosContainer_overview_header"><p className='movieInfosContainer_overview_header_title'>Synopsis</p></div>
                    <p className='movieInfosContainer_overview_txt'>{movieData.overview}</p>
                </div>
            </section>
            <section className='castSection'>
                <div className="castSection_title">
                    <h2 className=''>Casting du film</h2>
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
                    <h2 className=''>Films similaires</h2>
                </div>
                    <ul>
                        {similarData.map(el => {
                            return (
                                <MovieCard title={el.title} key={el.id} id={el.id} release={el.release}
                                poster={el.img} overview={el.overview} movieId={el.movieId} />
                                )
                        })}
                    </ul>
            </section>

        </main>
        );
};

export default Movie;