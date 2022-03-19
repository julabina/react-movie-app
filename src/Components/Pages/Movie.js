import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Movie = () => {

    const params = useParams();
    const [movieData, setMovieData] = useState({});
    const [bDrop, setBDrop] = useState();

    useEffect(() => {
        Promise.all ([
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json()),
            fetch('https://api.themoviedb.org/3/movie/' + params.id + '/credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR').then(res => res.json())
        ])
        .then(datas => {
            console.log(datas[1]);
            let director;
            let movieGenre = [];
            for (let i = 0;i < datas[1].crew.length;i++) {
                if (datas[1].crew[i].job === "Director") {
                    console.log(datas[1].crew[i]);
                    director = datas[1].crew[i].name;
                }
            }
            for (let i = 0; i < datas[0].genres.length;i++) {
                movieGenre.push(datas[0].genres[i].name + " ");
            }
            let runtime = datas[0].runtime;
            let h = Math.floor(runtime / 60);
            let m = Math.floor(runtime % 60);
            if (m.length === 1) {
                m = "0" + m; 
            }
           let movieTime = h + "h" + m;

            let item = {
                    genres : movieGenre,
                    runtime : movieTime ,
                    title : datas[0].title,
                    overview : datas[0].overview,
                    poster : "https://image.tmdb.org/t/p/w300" + datas[0].poster_path,
                    release : datas[0].release_date,
                    vote : datas[0].vote_average,
                    movieDirector : director
            }
            setBDrop("https://image.tmdb.org/t/p/original" + datas[0].backdrop_path);
            setMovieData(item);
        })
    },[])

    const movieTime = () => {
        return 'trtete'
    }
    
    return (
        <>
        <main>
            <div className='movieBackdrop' style={{
                backgroundImage: 'url("' + bDrop + '")'
            }} >
                <div className="movieBackdrop_container">
                    <div className="movieBackdrop_container_poster">
                        <img src={movieData.poster} alt="" />
                    </div>
                    <div className="movieBackdrop_container_infos">
                        <div className="movieBackdrop_container_infos_top">
                            <h1>{movieData.title}</h1>
                            {(movieData.movieDirector !== undefined) && <p>Un film de {movieData.movieDirector}</p>}
                        </div>
                        <div className="movieBackdrop_container_infos_bottom">
                            <div className="movieBackdrop_container_infos_bottom_left">
                                <p>{movieData.runtime}</p>
                                <p>{movieData.genres}</p>
                            </div>
                            <p>{movieData.vote}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        </>
    );
};

export default Movie;