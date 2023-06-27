const Post = require('../models/post.model');
const User = require('../models/user.model');

module.exports.findPostById = (req, res) => {
    Post.findById(req.params.id)
        .then(onePost => res.json(onePost))
        .catch(err => res.json({ message: "Something went wrong retrieving that post.", error: err }));
}

module.exports.findAllPosts = (req, res) => {
    Post.find()
        .then(allPosts => res.json({ posts: allPosts }))
        .catch(err => res.json({ message: "Something went wrong retrieving all posts.", error: err }))
}

module.exports.createPost = (req, res) => {
    Post.create({ user_id: req.userId, ...req.body })
        .then(newPost => {
            res.json(newPost)
            User.findByIdAndUpdate(req.userId, { $push: { 'posts': newPost._id.toString() }}, { new: true })
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
    Post.findByIdAndDelete(req.params.id)
        .then(result => {
            res.json(result)
            console.log(`ObjectId(${req.params.id})`)
            User.findByIdAndUpdate(req.userId, { $pull: { 'posts': req.params.id }})
                .then(updatedUser => console.log(updatedUser))
                .catch(err => console.log(err))
        })
        .catch(err => res.json({ message: "Something went wrong deleting the post.", error: err }))
}