import React from 'react'
import '../styles/Post.css'
import Profile from './Profile'

const AllPosts = ({showNewPost, profileToggle, toggleProfileComponent }) => {
    return (
        <div className='all-posts'>
            {showNewPost ? <div className="blur"></div> : null }
            <Profile profileToggle={profileToggle}/>
        </div>
    )
}

export default AllPosts