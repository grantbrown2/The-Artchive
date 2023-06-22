import React, { useState } from 'react'
import '../styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import HamburgerMenu from './HamburgerMenu';

const NavBar = () => {

    const [componentOpen, setComponentOpen] = useState(false);
    
    const toggleMenu = () => {
        setComponentOpen(!componentOpen);
    };

    return (
        <div className='nav-bar'>
            <div className='header'>
                <div className="hamburger-menu">
                    <FontAwesomeIcon icon={faBars} className='hamburger-menu-icon' onClick={toggleMenu}/>
                </div>
                <h1>The Artchive</h1>
            </div>
            {componentOpen && <HamburgerMenu componentOpen={componentOpen}/>}
        </div>
    )
}

export default NavBar