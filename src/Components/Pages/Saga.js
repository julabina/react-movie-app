import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Saga = () => {

    const [dataSaga, setDataSaga] = useState([]);
    const [dataPart, setDataPart] = useState([]);
    const [bDrop, setBDrop] = useState(null);
    const [movieInfo, setMovieInfo] = useState({});

    const params = useParams();

    useEffect(() => {
        fetch('https://api.themoviedb.org/3/collection/' + params.id + '?api_key=' + process.env.REACT_APP_API_KEY + '&language=fr-FR')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let arr = [];
                let item = {
                    sagaName: data.name,
                    overview: data.overview,
                    poster:"https://image.tmdb.org/t/p/w300" + data.poster_path
                };
                for (let i = 0; i < data.parts.length; i++) {
                    let poster = null;
                    if (data.parts[i].poster_path !== null) {
                        poster = "https://image.tmdb.org/t/p/w200" +  data.parts[i].poster_path;
                    }
                    let part = {
                        poster : poster,
                        title: data.parts[i].title,
                        overview: data.parts[i].overview,
                        vote: data.parts[i].vote_average,
                        release:data.parts[i].release_date,
                        id: uuidv4(),
                        movieId: data.parts[i].id,
                    };
                    arr.push(part);
                };
                setDataSaga(item);
                setDataPart(arr);
                if (data.backdrop_path) {
                    setBDrop("https://image.tmdb.org/t/p/original" + data.backdrop_path);
                }
                displayInfos(arr[0].title, arr[0].vote, arr[0].release, arr[0].overview, arr[0].movieId);
            })
    },[]);
    
    const displayInfos = (title, note, rel, ov, mId) => {
      let roundedNote = Math.round(note * 10) / 10
      let infos = {
          title: title,
          note: roundedNote,
          release: rel,
          overview: ov,
          movieId: mId
      };
      setMovieInfo(infos);
    }

    return (
        <main>
            <section className='movieBackdrop' style={bDrop !== null ? 
            {
                backgroundImage: 'url("' + bDrop + '")'
            }
            : {}
            } >

                <div className="movieBackdrop_container">
                    <div className="movieBackdrop_container_poster">
                        <img src={dataSaga.poster} alt={'affiche du film ' + dataSaga.sagaName} />
                    </div>
                    <div className="movieBackdrop_container_infos">
                        <div className="movieBackdrop_container_infos_top">
                            <h2>{dataSaga.sagaName}</h2>
                        </div>
                        <p>{dataSaga.overview}</p>
                    </div>
                </div>

            </section>
            <section className='saga_parts'>
                <div className="saga_parts_tabs">
                    {dataPart.map(el => {
                        return (
                            <div onClick={() => displayInfos(el.title, el.vote, el.release, el.overview, el.movieId)} key={el.id} className="saga_parts_tabs_tab" >
                                <img src={el.poster} alt={"Affiche du film " + el.title} />
                            </div>
                        )
                    })}
                </div>
                <div className="saga_parts_infos">
                    <div className="saga_parts_infos_top">
                        <div className="saga_parts_infos_top_left">
                            <h3>{movieInfo.title}</h3>
                            <p className="saga_parts_infos_top_left_release">{movieInfo.release}</p>
                        </div>
                        <p className="saga_parts_infos_top_vote">{movieInfo.note}</p>
                    </div>
                     <p className="saga_parts_infos_overview">{movieInfo.overview}</p>
                    <div className="saga_parts_infos_bot">
                        <Link to={"/movie/ref_=" + movieInfo.movieId}>
                            <button className='saga_parts_infos_bot_movieBtn'>Fiche du film</button>
                        </Link>
                    </div>
                </div>
            </section>
            
        </main>
    );
};

export default Saga;