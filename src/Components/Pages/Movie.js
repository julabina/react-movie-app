import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieNavBar from '../AppComponents/MovieNavBar';

const Movie = () => {

    const params = useParams();
    const [movieData, setMovieData] = useState({});
    const [bDrop, setBDrop] = useState();

    useEffect(() => {
        Promise.all ([
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '/credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json())
        ])
        .then(data => {
            console.log(data);
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

            let item = {
                    genres : movieGenre,
                    runtime : movieTime ,
                    title : data[0].title,
                    overview : data[0].overview,
                    poster : "https://image.tmdb.org/t/p/w300" + data[0].poster_path,
                    release : data[0].release_date,
                    vote : data[0].vote_average,
                    movieDirector : director
            }
            setBDrop("https://image.tmdb.org/t/p/original" + data[0].backdrop_path);
            setMovieData(item);
        })
    },[])
    
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
                    <p>Date de sortie : <span>{movieData.release}</span></p>
                </div>
                <div className="movieInfosContainer_overview">
                    <div className="movieInfosContainer_overview_header"><p className='movieInfosContainer_overview_header_title'>Synopsis</p></div>
                    <p className='movieInfosContainer_overview_txt'>{movieData.overview}</p>
                </div>
            </section>
        </main>
        );
};

export default Movie;