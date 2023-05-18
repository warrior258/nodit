const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    imageURL: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        required: [true, 'Description is required!']
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    communityID: {
        type: mongoose.Types.ObjectId,
        ref: 'Community',
        required: [true, 'Please provide the community ID!'],
    },
    userID: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide the user ID!'],
    }
}, {timestamps: true});

module.exports = mongoose.model('Post', PostSchema);