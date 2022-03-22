import React, { useState } from 'react';

const SeasonModalOverview = (props) => {

    const [overviewToggle, setOverviewToggle] = useState(false);

    const toggleModal = () => {
        setOverviewToggle(!overviewToggle);
    }

    return (
        <>
        <div>
            <button onClick={toggleModal}>Lire le synopsis</button>
        </div>
        <div className={overviewToggle ? "modalOverviewOverlay" : "modalOverviewOverlay modalOverviewOverlay--hidden"} >
            <div className="modalOverviewOverlay_modal">
                <div className="modalOverviewOverlay_modal_cont">
                    <button onClick={toggleModal} className='modalOverviewOverlay_modal_cont_closeBtn'>X</button>
                    <h1>Synopsis :</h1>
                    <p>{props.overview}</p>
                </div>
            </div>
        </div>
        </>
    );
};

export default SeasonModalOverview;