import React, { useState }  from 'react';

const ModalAbout = () => {

    const [toggleModalAbout, setToggleModalAbout] = useState(false);

    const openModal = () => {
        setToggleModalAbout(!toggleModalAbout);
    }

    return (
        <>
        <div className="headerOption_svgCont" onClick={openModal}>
            <svg className='headerOption_svgCont_svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"/></svg>
        </div>
        {toggleModalAbout && 
        <div className='modalAbout_overlay'>
            <div className="modalAbout_cont">
                <div className="modalAbout_cont_modal">
                    <h1>A PROPOS</h1>
                    <p>TEXT 1</p>
                    <p>TEXT 2</p>
                    <a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by pongsakornRed - Flaticon</a>
                    <button onClick={openModal}>OK</button>
                </div>
            </div>
        </div>
        }
        </>
    );
};

export default ModalAbout;