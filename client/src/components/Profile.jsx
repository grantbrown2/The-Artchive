import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProfileIcon from '../styles/ProfileIcon.png';
import '../styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Profile = ({ profileToggle, postList, setPostList, fullPostList, setFullPostList }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        // Make an Axios request to get all posts
        axios.get('http://localhost:8000/api/posts', { withCredentials: true })
            .then((res) => {
                const allPosts = res.data.posts;
                // Make another Axios request to get the current user's ID
                axios.get('http://localhost:8000/api/users/self', { withCredentials: true })
                    .then((userRes) => {
                        const currentUserId = userRes.data.user._id;
                        // Filter posts to include only those with the same author ID as the current user's ID
                        const userPosts = allPosts.filter((post) => post.author._id === currentUserId);
                        setPostList(userPosts);

                        setUsername(userRes.data.user.username);
                        setFirstName(userRes.data.user.firstName);
                        setLastName(userRes.data.user.lastName);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, [setPostList]);

    const deletePost = (postId) => {
        axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true })
            .then(() => {
                const updatedPostList = postList.filter((post) => post._id !== postId);
                setPostList(updatedPostList);
                setFullPostList(updatedPostList);
            })
            .catch(err => console.log(err));
    };


    return (
        profileToggle ? (
            <div className='profile-page'>
                <div className="header9">
                    <div className="profile-container">
                        <img src={ProfileIcon} className='profile-icon' alt='Profile Icon' />
                    </div>
                    <div className="header10">
                        <div className="sub-header">
                            <span className="username">{username}</span>
                            <button >Edit Profile</button>
                            <FontAwesomeIcon icon={faGear} className='settings' />
                        </div>
                        <div className="sub-header2">
                            <span className='stats'>0 Posts</span>
                            <span className='stats'>0 Followers</span>
                            <span className='stats'>0 Following</span>
                        </div>
                        <div className="sub-header2">
                            <span className='full-name'>{firstName} {lastName}</span>
                        </div>
                    </div>
                </div>

                {/* LIST OF POSTS  */}
                <div className="post-grid">
                    {postList.map((post) => {
                        return (
                            <div className="post-container" key={post._id}>
                                <button onClick={() => deletePost(post._id)}>X</button>
                                <img src={`http://localhost:8000/${post.postImages[0]}`} className='post-image-profile' alt='post' />
                            </div>
                        );
                    })}
                </div>
            </div>
        ) : null
    );
}
export default Profile