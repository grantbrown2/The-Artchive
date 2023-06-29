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
    const [postList, setPostList] = useState([]);
    const [fullPostList, setFullPostList] = useState([]);

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
            <NavBar
                componentOpen={componentOpen}
                toggleMenu={toggleMenu}
                toggleNewPost={toggleNewPost}
                showNewPost={showNewPost}
                toggleProfileComponent={toggleProfileComponent}
                postList={postList}
                setPostList={setPostList}
                fullPostList={fullPostList}
                setFullPostList={setFullPostList}
            />
            <BottomBar
                setProfileToggle={setProfileToggle}
                setComponentOpen={setComponentOpen}
                setShowNewPost={setShowNewPost}
            />
            <AllPosts
                showNewPost={showNewPost}
                profileToggle={profileToggle}
                postList={postList}
                setPostList={setPostList}
                fullPostList={fullPostList}
                setFullPostList={setFullPostList}
            />
        </div>
    )
}

export default WithAuth(Main)