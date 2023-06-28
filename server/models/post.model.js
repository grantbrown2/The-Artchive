const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String },
    description: { type: String },
    filepath: { type: String }, // adjust this later to accomodate file upload
    likes: [],
    comments: []
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);