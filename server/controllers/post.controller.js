const Post = require('../models/post.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

module.exports.findPostById = (req, res) => {
    Post.findById(req.params.id).populate('author', 'username email firstName lastName')
        .then(onePost => res.json(onePost))
        .catch(err => res.json({ message: "Something went wrong retrieving that post.", error: err }));
}

module.exports.findAllPosts = (req, res) => {
    Post.find().populate('author', 'username email firstName lastName')
        .then(allPosts => res.json({ posts: allPosts }))
        .catch(err => res.json({ message: "Something went wrong retrieving all posts.", error: err }))
}

module.exports.createPost = (req, res) => {
    let objectId = new mongoose.Types.ObjectId(req.userId);
    Post.create({ author: objectId, ...req.body })
        .then(newPost => {
            res.json(newPost)
            User.findByIdAndUpdate(req.userId, { $push: { 'posts': newPost }}, { new: true })
                .then(updatedUser => console.log(updatedUser))
                .catch(err => console.log(err))
        })
        .catch(err => res.json({ message: "Something went wrong creating a post.", error: err }));
}

module.exports.updatePost = (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedPost => res.json(updatedPost))
        .catch(err => res.json({ message: "Something went wrong updating a post.", error: err }))
}

module.exports.deletePost = (req, res) => {
    let objectId = new mongoose.Types.ObjectId(req.params.id);
    Post.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json(result)
            User.findByIdAndUpdate(req.userId, { $pull: { 'posts': { '_id': objectId }}})
                .then(updatedUser => console.log(updatedUser))
                .catch(err => console.log(err))
        })
        .catch(err => res.json({ message: "Something went wrong deleting the post.", error: err }))
}