import React from 'react'
import '../styles/HamburgerMenu.css'

const HamburgerMenu = ({componentOpen}) => {

    return (
        <div className={`hamburger ${componentOpen ? 'open' : 'close'}`}>
            <h2 className='hamburger-title'>The Artchive</h2>
            <div className="hamburger-line" />
            <p>this is unfinished - any suggestions would be appreciated </p>
        </div>
    )
}

export default HamburgerMenu