import React, { useEffect } from 'react'
import axios from 'axios'
import '../styles/Post.css'
import Profile from './Profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import PostSettings from './PostSettings';

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const AllPosts = ({showNewPost,
    profileToggle,
    postList,
    setPostList,
    fullPostList,
    setFullPostList,
    loggedInUsername,
    togglePostSettings,
    activePostId,
    postIDD}) => {

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts', { withCredentials: true })
            .then(response => {
                const reverseList = response.data.posts.reverse();
                setFullPostList(reverseList);
            })
            .catch(error => {
                console.log(error);
            });
    }, [setFullPostList]);

    return (
        <div className='all-posts'>
            {showNewPost ? <div className="blur"></div> : null }
            <Profile profileToggle={profileToggle} postList={postList} setPostList={setPostList} fullPostList={fullPostList} setFullPostList={setFullPostList}/>
            {!profileToggle && fullPostList.map((post) => (
                <div className='post-content' key={post._id}>
                    <div className="sub-header23">
                        <span className='author-header'>{post.author.username}</span>
                        <div className="date-header">
                            <span className='post-date'>{formatDate(post.createdAt)}</span>
                            {loggedInUsername === post.author.username ? (
                                <div className='date-settings-container'>
                                    <FontAwesomeIcon icon={faGear} className='all-posts-settings' onClick={() => togglePostSettings(post._id)}/>
                                    {activePostId === post._id && <PostSettings postIDD={postIDD}  setPostList={setPostList} setFullPostList={setFullPostList}/>}
                                </div>
                            ) : null }
                        </div>
                    </div>
                    {post.postImages.map((image, index) => {
                                const imageURL = `http://localhost:8000/${image.replace(/\\/g, '/')}`;
                                return <img className='post-image' key={index} src={imageURL} alt={`Post ${index + 1}`}/>;
                            })}
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