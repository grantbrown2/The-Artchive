import React from 'react'
import '../BottomBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';




const BottomBar = () => {

    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <div className="menu">
                <a className="menu__link" href="/">
                    Home
                </a>
                <a className="menu__link" href="/">
                    About
                </a>
                <a className="menu__link" href="/">
                    Logout
                </a>
            </div>
            <ul className="social-icon">
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://github.com/grantbrown2">
                        <FontAwesomeIcon icon={faGithubSquare} />
                    </a>
                </li>
                <li className="menu__item">
                    <a className="social-icon__link" href="https://github.com/shu-william">
                        <FontAwesomeIcon icon={faGithubSquare} />
                    </a>
                </li>
                <li className="menu__item">
                    <a className="social-icon__link" href="#">
                        <FontAwesomeIcon icon={faGithubSquare} />
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default BottomBar