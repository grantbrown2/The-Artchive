const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { type: String },
    description: { type: String },
    postImages: {
        type: [String]
    },
    // Model ideas: https://stackoverflow.com/questions/28006521/how-to-model-a-likes-voting-system-with-mongodb
    likeCount: { type: Number, default: 0 },
    likes: [],
    comments: [] // will likely need to create a separate comments model so users can reply in comment threads
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);