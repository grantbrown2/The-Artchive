import React from 'react'
import axios from 'axios'

const PostSettings = ({setPostList, setFullPostList, postIDD}) => {

    const deletePost = (postId) => {
        axios.delete(`http://localhost:8000/api/posts/${postId}`, { withCredentials: true })
            .then(() => {
                axios.get('http://localhost:8000/api/posts', { withCredentials: true })
                .then((res) => {
                    const updatedPostList = res.data.posts.reverse();
                    setPostList(updatedPostList);
                    setFullPostList(updatedPostList);
                })
            })
            .catch(err => console.log(err));
    };

    const style = {
        color: 'white',
        width: '100px',
        height: '50px',
        backgroundColor: 'black',
        position: 'relative',
        top: '-25px',
        right: '-25px'
    }
    return (
        <div style={style}>
            <button>Edit Post</button>
            <button onClick={() => deletePost(postIDD)}>Delete Post</button>
        </div>
    )
}

export default PostSettings