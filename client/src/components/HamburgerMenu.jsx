import React from 'react'
import '../styles/HamburgerMenu.css'

const HamburgerMenu = ({componentOpen}) => {

    return (
        <div className={`hamburger ${componentOpen ? 'open' : 'close'}`}>
            
        </div>
    )
}

export default HamburgerMenu