import React, { useState } from 'react';

const ToTop = () => {

    const [visible, setVisible] = useState(false);


    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        (scrolled > 300) ? setVisible(true) : setVisible(false);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener("scroll", toggleVisible);

    return (
       <div onClick={scrollToTop} style={{display : visible ? 'flex' : 'none'}} className='toTop'>
            <p>V</p>
        </div>
    );
};

export default ToTop;