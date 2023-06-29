import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProfileIcon from '../styles/ProfileIcon.png';
import '../styles/Profile.css';
import temp from '../styles/TEMP.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Profile = ({profileToggle, postList, setPostList, fullPostList, setFullPostList }) => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/update', {withCredentials: true})
    })

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/self', {withCredentials: true})
            .then(res => {
                setPostList(res.data.user.posts);
                setUsername(res.data.user.username);
                setFirstName(res.data.user.firstName);
                setLastName(res.data.user.lastName);
            })
            .catch(err => console.log(err))
    }, [setPostList])

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
                        <img src={ProfileIcon} className='profile-icon' alt='Profile Icon'/>
                    </div>
                    <div className="header10">
                        <div className="sub-header">
                            <span className="username">{username}</span>
                            <button >Edit Profile</button>
                            <FontAwesomeIcon icon={faGear} className='settings'/>
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
                                {/* <img src={post.image} className='post-image' /> */}
                                <button onClick={() => deletePost(post._id)}>X</button>
                                <img src={temp} className='post-image-profile' alt='Post' onClick={() => console.log("TEST")}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        ) : null
    );
}

export default Profile