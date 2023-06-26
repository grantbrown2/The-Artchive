import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BottomBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';




const BottomBar = () => {

    const navigate = useNavigate();

    function logoutUser(e) {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate("/");
            })
            .catch(err => console.log(err))
    }

    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <div className="menu">
                <a className="menu__link" href="/home">
                    Home
                </a>
                <a className="menu__link" href="/">
                    About
                </a>
                <Link  className="menu__link" onClick={logoutUser}>
                    Logout
                </Link>
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
                    <a className="social-icon__link" href="https://github.com/JoshuaEPearson">
                        <FontAwesomeIcon icon={faGithubSquare} />
                    </a>
                </li>
            </ul>
        </footer>
    )
}

export default BottomBar