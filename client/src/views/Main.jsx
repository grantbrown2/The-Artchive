import React, { useState } from 'react'
import BottomBar from '../components/BottomBar'
import NavBar from '../components/NavBar'
import WithAuth from '../components/WithAuth'
import AllPosts from '../components/AllPosts'
import './Main.css'


const Main = () => {
    const [componentOpen, setComponentOpen] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const toggleMenu = () => {
        setComponentOpen(!componentOpen);
        if (showNewPost === true) {
            setShowNewPost(!showNewPost);
        }
    };

    const toggleNewPost = () => {
        setShowNewPost(!showNewPost);
    };

    const toggleProfileComponent = () => {
        setProfileToggle(!profileToggle);
        setComponentOpen(false);
    };

    return (
        <div className='main'>
            <NavBar componentOpen={componentOpen} toggleMenu={toggleMenu} toggleNewPost={toggleNewPost} showNewPost={showNewPost} toggleProfileComponent={toggleProfileComponent}/>
            <BottomBar setProfileToggle={setProfileToggle} setComponentOpen={setComponentOpen}/>
            <AllPosts showNewPost={showNewPost} profileToggle={profileToggle}/>
        </div>
    )
}

export default WithAuth(Main)