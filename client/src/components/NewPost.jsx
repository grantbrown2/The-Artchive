import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import '../styles/Post.css'

const NewPost = ({showNewPost, setShowNewPost}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [filepath, setFilepath] = useState(null);

    const toggleNewPost = () => {
        setShowNewPost(!showNewPost);
    };

    const handleInputChange = (e) => {
        const input = e.target;
        if (input.value.trim() !== "") {
            input.classList.add("has-content");
        } else {
            input.classList.remove("has-content");
        }
    }

    const handleNewPost = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/posts/new", {
            title,
            description,
            filepath
        })
            .then(res => {
                console.log(res.data);
                toggleNewPost();
            })
            .catch(err => {
                console.log(err);
            });
    };


    return (
        <div className={`container ${showNewPost ? 'open' : 'close'}`}>
            <div className="header-2">
                <h5 className='title'>Create a New Post</h5>
                <button className='post-delete-btn' onClick={toggleNewPost}>X</button>
            </div>
                <form onSubmit={handleNewPost}>
                    <div className="image-upload">
                        <label htmlFor="file-input">Choose an image</label>
                        <input className="file-input" type="file" id='filepath' name='filepath' onChange={e => {setFilepath(e.target.value); handleInputChange(e); }}/>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="title" name="title"/>
                        <label htmlFor="title" className='input-label' onChange={e => {setTitle(e.target.value); handleInputChange(e); }}>Title:</label>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="description" name="description"/>
                        <label htmlFor="description" className='input-label' onChange={e => {setDescription(e.target.value); handleInputChange(e); }}>Description:</label>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
        </div>
    )
}

export default NewPost