const Post = require('../models/Post');
const Commuinty = require('../models/Community');

const getAllPosts = async (req, res) => {
    // console.log(req.user);
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json(error)
    }
};

const getCommunityRelatedPost = async (req, res) => {
    
    const { communityID } = req.params;

    try {
        const posts = await Post.find({communityID: communityID});
        // console.log(posts);
        if(posts.length === 0){
            return res.status(200).send('no post found');
        }

        res.status(200).json(posts);


    } catch (error) {
        res.status(400).json(error);
    }
};

const getUserRelatedPosts = async (req, res) => {

    const { userID } = req.user;
    
    try {
        //find the user's joined communities
        const comm = await Commuinty.find({joinedUsers: userID});
        if(comm.length === 0){
            return res.status(200).send('no joined communities found for this user')
        }
        
        //creating array to store communities id's
        let commIDs = [];
        comm.forEach((com) => {
            commIDs.push(JSON.stringify(com._id).slice(1,25));
        });

        //getting all the posts for that joined communities
        const post = await Post.find({communityID: { $in: commIDs }});
        // console.log(post);
        res.status(200).json(post);

    } catch (error) {
        res.status(400).json(error);
    }
};

const getUserLikedPosts = async (req, res) => {
    
    const { userID } = req.params;

    try {
        const posts = await Post.find({likes: { $in: userID }});
        // console.log(posts);
        if(posts.length === 0){
            return res.status(200).send('no post found');
        }

        res.status(200).json(posts);


    } catch (error) {
        res.status(400).json(error);
    }
};

const createPost = async (req, res) => {
    // console.log(req.body);
    const { title, desc, communityID, userID } = req.body;
    // console.log(req.body);
    if(title === '' || desc === '' || communityID === '' || userID === ''){
        return res.status(400).send('All fields are required!');
    }

    try {
        //Checking the type of community private or public
        //And if this private then checking if the user is joined to community
        //or not to create a post

        const findcomm = await Commuinty.findById({_id: communityID});

        if(findcomm.communityType === 'private'){
            if(findcomm.joinedUsers.includes(userID)){
                //Have to uncomment this
                // const createPostt = await Post.create(req.body);
                // return res.status(201).send(createPostt);
                // return console.log("you can create post");
            }else{
                return res.status(200).send("join the community to create post");
            }
        }

        // res.status(201).send("created");

        //if something not work delete uper code and uncomment this
        const createPost = await Post.create(req.body);
        res.status(201).json(createPost);

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const editPost = (req, res) => {
    res.send('Post Edited!');
};

const deletePost = async (req, res) => {

    const { id } = req.params;

    try {
        await Post.findByIdAndRemove({_id: id});
        res.send('Post Deleted!');
    } catch (error) {
        res.status(400).json(error);
    }   

};

module.exports = { getAllPosts, getCommunityRelatedPost, getUserLikedPosts, getUserRelatedPosts, createPost, editPost, deletePost };