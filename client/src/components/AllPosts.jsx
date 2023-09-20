import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Post.css'
import temp from '../styles/TEMP.png'
import Profile from './Profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';

const AllPosts = ({showNewPost, profileToggle, toggleProfileComponent, postList, setPostList, fullPostList, setFullPostList }) => {

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts', { withCredentials: true })
            .then(response => {
                const reverseList = response.data.posts.reverse();
                setFullPostList(reverseList);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className='all-posts'>
            {showNewPost ? <div className="blur"></div> : null }
            <Profile profileToggle={profileToggle} postList={postList} setPostList={setPostList} fullPostList={fullPostList} setFullPostList={setFullPostList}/>
            {!profileToggle && fullPostList.map((post) => (
                <div className='post-content' key={post._id}>
                    <div className="sub-header23">
                        <span className='author-header'>{post.author.username}</span>
                        <span>post date</span>
                        <FontAwesomeIcon icon={faGear} className='settings'/>
                    </div>
                    <img src={temp} className='post-image' alt='Post'/>
                    <div className="like-box">
                        <button className='likes'><FontAwesomeIcon icon={faHeart} /></button>
                        <button className='likes'><FontAwesomeIcon icon={faComment} /></button>
                    </div>
                    <h3 className='post-title'>{post.title}</h3>
                    <p className='post-description'>{post.description}</p>
                </div>
            ))}
            <div className="end-page"><p className='end-text'>End of Content!</p></div>
        </div>
    )
}

export default AllPosts