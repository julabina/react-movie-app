import React from 'react'; 
import NavBar from '../AppComponents/NavBar';

const Header = (props) => {
    return (
        <header>
            <NavBar />
            <h1>TITRE DU SITE</h1>
            <div className="headerOption">
                <div className="headerOption_darkmod">
                    <label />
                    <div className="btnDarkMod">BTN</div>
                </div>
                <p> - </p>
                <p>IMG</p>             
            </div>
        </header>
    );
};

export default Header;