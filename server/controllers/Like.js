const Post = require('../models/Post')


const getAllLikes = async (req, res) => {
    
    res.send('Getting all likes');
    
};

const createLike = async (req, res) => {
    const { postID, userID } = req.body;

    try {

        const findUser = await Post.findOne({_id: postID, likes: userID});
        // console.log(findUser);
        if(findUser){
            return res.status(200).send('User Already liked the post!')
        }


        const like = await Post.findByIdAndUpdate({_id: postID}, {
            $push: {likes: userID}
        }, {new: true})

        res.status(201).json(like);

    } catch (error) {
        res.status(400).json(error);   
    }
};

const deleteLike = async (req, res) => {
    const { postID, userID } = req.body;

    try {

        // const findUser = await Post.findOne({_id: postID, likes: userID});
        // console.log(findUser);
        // if(!findUser){
        //     return res.status(200).send('User Already disliked the post!')
        // }


        const unlike = await Post.findByIdAndUpdate({_id: postID}, {
            $pull: {likes: userID}
        }, {new: true})

        res.status(201).json(unlike);

    } catch (error) {
        res.status(400).json(error);   
    }
};

module.exports = { getAllLikes, createLike, deleteLike }
