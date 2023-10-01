const Post = require('../models/post.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

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

module.exports.createPost = async (req, res) => {
    // Extract user ID from the token
    const token = req.cookies.usertoken;
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.id;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    // Check if there are uploaded files
    if (req.files && req.files.length > 0) {
        try {
            // Get the file paths and original names
            const filePaths = req.files.map(file => file.path);
            const originalNames = req.files.map(file => file.originalname);

            // Rename the uploaded files with their original file names
            const renamedFilePaths = await renameFilesWithExtension(
                filePaths,
                originalNames
            );

            // Update the postImages field with the renamed file paths
            req.body.postImages = renamedFilePaths;
        } catch (err) {
            console.error('Error renaming files:', err);
            return res.status(500).json({ message: 'Error renaming files', error: err });
        }
    }

    Post.create({ author: user, title: req.body.title, description: req.body.description, postImages: req.body.postImages })
    .then(newPost => {
        // Update the user's 'posts' field with the new post's ID
        User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } }, { new: true })
            .then(updatedUser => {
                // Rest of your code...
            })
            .catch(err => {
                console.error('Error updating user with new post:', err);
                res.status(500).json({ message: 'Error updating user with new post', error: err });
            });
    })
        .catch(err => {
            console.error('Error creating a post:', err);
            res.status(500).json({ message: 'Something went wrong creating a post.', error: err });
        });
};



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

async function renameFilesWithExtension(filePaths, newExtension) {
    const renamedFilePaths = [];

    for (const filePath of filePaths) {
        const fileDir = path.dirname(filePath);
        const oldFileName = path.basename(filePath);
        const newFileName = `${path.parse(oldFileName).name}${newExtension}`;
        const newPath = path.join(fileDir, newFileName);

        try {
            await fs.rename(filePath, newPath);
            renamedFilePaths.push(newPath);
        } catch (err) {
            console.error(`Error renaming file: ${filePath}`, err);
        }
    }

    return renamedFilePaths;
}