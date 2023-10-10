import React, { useEffect, useState } from 'react'
import BottomBar from '../components/BottomBar'
import NavBar from '../components/NavBar'
import WithAuth from '../components/WithAuth'
import AllPosts from '../components/AllPosts'
import './Main.css'
import axios from 'axios'
import About from '../components/About'


const Main = () => {
    const [componentOpen, setComponentOpen] = useState(false);
    const [aboutToggle, setAboutToggle] = useState(false);
    const [showNewPost, setShowNewPost] = useState(false);
    const [profileToggle, setProfileToggle] = useState(false);

    const [activePostId, setActivePostId] = useState(null);
    const [postIDD, setPostIDD] = useState('');

    const [postList, setPostList] = useState([]);
    const [fullPostList, setFullPostList] = useState([]);

    const [loggedInUsername, setLoggedInUsername] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/self', { withCredentials: true })
            .then((response) => {
                setLoggedInUsername(response.data.user.username)
            })
    }, [])

    const toggleMenu = () => {
        setComponentOpen(!componentOpen);
        if (showNewPost === true) {
            setShowNewPost(!showNewPost);
        }
        if (aboutToggle === true) {
            setAboutToggle(false);
        }
    };

    const toggleNewPost = () => {
        setShowNewPost(!showNewPost);
    };

    const toggleProfileComponent = () => {
        setProfileToggle(!profileToggle);
        setComponentOpen(false);
    };

    const togglePostSettings = (postId) => {
        setActivePostId(postId === activePostId ? null : postId);
        setPostIDD(postId);
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
                setAboutToggle={setAboutToggle}
            />
            {aboutToggle ? (
                <About />
            ): null}
            <AllPosts
                showNewPost={showNewPost}
                profileToggle={profileToggle}
                postList={postList}
                setPostList={setPostList}
                fullPostList={fullPostList}
                setFullPostList={setFullPostList}
                loggedInUsername={loggedInUsername}
                togglePostSettings={togglePostSettings}
                activePostId={activePostId}
                postIDD={postIDD}
                aboutToggle={aboutToggle}
            />
        </div>
    )
}

export default WithAuth(Main)