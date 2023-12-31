import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HamburgerMenu.css'
import NewPost from './NewPost'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSquarePlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const HamburgerMenu = ({componentOpen,
    toggleNewPost,
    showNewPost,
    toggleProfileComponent,
    postList, setPostList,
    fullPostList,
    setFullPostList,
    toggleMenu}) => {

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
        <div className={`hamburger ${componentOpen ? 'open' : 'close'}`}>
            <h2 className='hamburger-title'>The Artchive</h2>
            <div className="hamburger-line" />
            <div className='menu-links'>
                <div className="menu-flex">
                    <FontAwesomeIcon className="menu-icons" icon={faUser} />
                    <button className='ham-btn' onClick={toggleProfileComponent}>Profile</button>
                </div>
                <div className="menu-flex">
                    <FontAwesomeIcon className="menu-icons" icon={faSquarePlus} />
                    <button className='ham-btn' onClick={toggleNewPost}>Create Post</button>
                </div>
                <div className="menu-flex">
                    <FontAwesomeIcon className="menu-icons" icon={faRightFromBracket} />
                    <button className='ham-btn' onClick={logoutUser}>Logout</button>
                </div>
            </div>
            {showNewPost && <NewPost
            showNewPost={showNewPost}
            toggleNewPost={toggleNewPost}
            postList={postList}
            setPostList={setPostList}
            fullPostList={fullPostList}
            setFullPostList={setFullPostList}
            toggleMenu={toggleMenu}/>}
        </div>
    )
}

export default HamburgerMenu