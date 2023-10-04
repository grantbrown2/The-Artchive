import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import '../styles/Post.css'

const NewPost = ({showNewPost, toggleNewPost, postList, setPostList, fullPostList, setFullPostList}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [postImages, setPostImages] = useState([]);


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
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("postImages", postImages);
        axios.post("http://localhost:8000/api/posts",
            formData, 
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            }
        )
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    const newPost = res.data
                    setPostList([...postList, newPost]);
                    setFullPostList([newPost, ...fullPostList]);
                    toggleNewPost();
                } else {
                    console.log("error occurred in the .then statement")
                }
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
                <form encType="multipart/form-data" onSubmit={handleNewPost}>
                    <div className="image-upload">
                        <label htmlFor="file-input">Choose an image</label>
                        <input type="file" id="postImages" name="postImages" accept="image/*" onChange={e => { setPostImages(e.target.files[0]); handleInputChange(e); }} />
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="title" name="title" onChange={e => {setTitle(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="title" className='input-label'>Title:</label>
                    </div>
                    <div className="input-container">
                        <input type="text" className="input-field" id="description" name="description" onChange={e => {setDescription(e.target.value); handleInputChange(e); }}/>
                        <label htmlFor="description" className='input-label'>Description:</label>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
        </div>
    )
}

export default NewPost