import React from 'react'
import { useState } from 'react'
import '../styles/HamburgerMenu.css'
import NewPost from './NewPost'

const HamburgerMenu = ({componentOpen}) => {
    const [showNewPost, setShowNewPost] = useState(false);
    const toggleNewPost = () => {
        setShowNewPost(!showNewPost);
    };

    return (
        <div className={`hamburger ${componentOpen ? 'open' : 'close'}`}>
            <h2 className='hamburger-title'>The Artchive</h2>
            <div className="hamburger-line" />
            <div className='menu-links'>
                <button>Profile</button>
                <button onClick={toggleNewPost}>Create Post</button>
                <button>Logout</button>
            </div>
            {showNewPost && <NewPost showNewPost={showNewPost} setShowNewPost={setShowNewPost}/>}
        </div>
    )
}

export default HamburgerMenu