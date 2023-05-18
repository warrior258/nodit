const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'comment is required']
    },
    communityID: {
        type: mongoose.Types.ObjectId,
        ref: 'Community',
        required: [true, 'Please provide the community ID!'],
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user ID!'],
    },
    postID: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
        required: [true, 'Please provide the post ID!'],
    }
}, {timestamps: true});

module.exports = mongoose.model('Comment', CommentsSchema);