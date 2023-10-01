const UserController = require('../controllers/user.controller');
const PostController = require('../controllers/post.controller');
const { authenticate, getIdFromCookie } = require('../config/jwt.config');
const express = require('express');
const { get } = require('mongoose');
const path = require('path'); // Import the 'path' module

const multer = require('multer');

const upload = multer({ dest: 'uploads/' });




module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    })
    app.use('/uploads', express.static('uploads'));

    app.post('/api/users/register', UserController.createUser);
    app.post('/api/users/login', UserController.loginUser);
    app.post('/api/users/logout', UserController.logout);
    app.get('/api/users/all', authenticate, getIdFromCookie, UserController.findAllUsers);
    app.get('/api/users/self', authenticate, getIdFromCookie, UserController.findUserById);
    app.get('/api/users/:username', authenticate, getIdFromCookie, UserController.findUserByName);
    app.patch('/api/users/update', authenticate, getIdFromCookie, UserController.updateUser);
    app.delete('/api/users/delete', authenticate, getIdFromCookie, UserController.deleteUser);
    
    app.post('/api/posts', authenticate, getIdFromCookie, upload.array('postImages'), PostController.createPost);
    app.get('/api/posts', authenticate, getIdFromCookie, PostController.findAllPosts);
    app.get('/api/posts/:id', authenticate, getIdFromCookie, PostController.findPostById);
    app.patch('/api/posts/:id', authenticate, getIdFromCookie, PostController.updatePost);
    app.delete('/api/posts/:id', authenticate, getIdFromCookie, PostController.deletePost);
}