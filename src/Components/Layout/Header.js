import React from 'react'; 
import ModalAbout from '../AppComponents/ModalAbout';
import NavBar from '../AppComponents/NavBar';

const Header = () => {

    return (
        <header>
            <NavBar />
            <h1 className='headerTitle'>TITRE DU SITE</h1>
            <div className="headerOption">
                <div className="headerOption_darkmod">
                    <label />
                    <div className="btnDarkMod">BTN</div>
                </div>
                <p> - </p>
            </div>
        </header>                    
    );
};

export default Header;