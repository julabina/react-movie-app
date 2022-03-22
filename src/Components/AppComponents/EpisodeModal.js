import React, { useState } from 'react';

const EpisodeModal = (props) => {

    const [toggleModal, setToggleModal] = useState(false);

    const toggle = () => {
        setToggleModal(!toggleModal);
    }

    return (
        <>
        <button onClick={toggle} className='modalEpisode_toggleBtn'>Infos</button>
        {toggleModal && 
        <div className='modalEpisode_overlay'>
            <div className="modalEpisode_cont">
                <div className="modalEpisode_cont_modal">
                    <button onClick={toggle} className='modalEpisode_cont_modal_closeBtn'>X</button>
                    <img src={props.background} alt={"photo promotionnelle de l' épisode" + props.episodeNumber} />
                    <h1>{props.title}</h1>
                    <div className="modalEpisode_cont_modal_infos">
                        <p>{props.airDate}</p>
                        <p>{props.vote}</p>
                    </div>
                    <p className='modalEpisode_cont_modal_overview'>{props.overview}</p>
                </div>
            </div>
        </div>
        }
        </>
    );
};

export default EpisodeModal;