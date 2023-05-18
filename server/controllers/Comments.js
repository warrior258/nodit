const Comment = require('../models/Comments')

const getAllComments = async (req, res) => {
    
    try {
        const comments = await Comment.find({});
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getPostRelatedComments = async (req, res) => {

    const { communityID, postID } = req.params;

    try {
        const comment = await Comment.find({communityID: communityID, postID: postID});
        if(comment.length === 0){
            return res.status(200).send("no comments on this post");
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json(error);   
    }

    
};

const createComment = async (req, res) => {
    const { text, communityID, userID, postID } = req.body;

    if(text === '' || communityID === '' || userID === '' || postID === ''){
        return res.status(400).send('Please provide all the fields!');
    }

    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteComment = async (req, res) => {

    const { id } = req.params;

    try {
        const comment = await Comment.findByIdAndDelete({_id: id});
        if(!comment){
            return res.status(404).send('Comment not found!');
        }
        res.status(200).send('deleted!');
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { getAllComments, getPostRelatedComments, createComment, deleteComment };