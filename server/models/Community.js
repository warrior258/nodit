const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Community name must be provided!']
    },
    desc: {
        type: String,
        required: [true, 'Community description must be provided!']
    },
    communityType: {
        type: String,
        enum: ['public', 'restricted', 'private'],
        default: 'private'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required!']
    },
    joinedUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model('Commuinty', CommunitySchema);