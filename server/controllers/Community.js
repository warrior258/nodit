const Commuinty = require('../models/Community');

const getAllCommunities = async (req, res) => {
    
    try {
        const comm = await Commuinty.find({});
        res.status(200).json(comm);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getSingleCommunity = async (req, res) => {

    const { id } = req.params;

    try {
        const comm = await Commuinty.findById({_id: id});
        if(!comm){
            return res.status(404).send('Community not found!');
        }
        res.status(200).json(comm);
    } catch (error) {
        res.status(400).json(error);
    }
};

const createCommunity = async (req, res) => {
    
    const {name, desc, createdBy} = req.body;

    if(name === '' || desc === '' || createdBy === ''){
        return res.status(400).send('Please provide all the fields!');
    }

    try {
        //Checking if community name is already in use or not
        const find_comm = await Commuinty.findOne({name: name}).lean();
        if(find_comm){
            return res.status(400).send('Community name already exists!');
        }

        //Creating the community
        const create = await Commuinty.create(req.body);
        res.status(201).json(create);        
    } catch (error) {
        res.status(400).json(error);
    }
};

const editCommunity = (req, res) => {
    res.send('Community Edited!');
};

const deleteCommunity = async (req, res) => {
    const { id } = req.params;

    try {
        const comm = await Commuinty.findByIdAndDelete({_id: id});
        if(!comm){
            return res.status(404).send('Community not found!');
        }
        res.status(200).send('deleted!');
    } catch (error) {
        res.status(400).json(error);
    }
};

const joinCommunity = async (req, res) => {
    
    const { communityID, userID } = req.body;

    try {
        const findUser = await Commuinty.findOne({_id: communityID, joinedUsers: userID});
        if(findUser){
            return res.status(200).send('Already joined!');
        }

        const join = await Commuinty.findByIdAndUpdate({_id: communityID}, {
            $push: {joinedUsers: userID}
        }, {new: true});

        if(!join){
            return res.status(404).send('Community not found');
        }

        res.status(200).json(join);
        
    } catch (error) {
        res.json(error)   
    }
};

const leaveCommunity = async (req, res) => {
    const { communityID, userID } = req.body;

    try {
        const findUser = await Commuinty.findOne({joinedUsers: userID});
        if(!findUser){
            return res.status(200).send('User hasnt joined yet');
        }

        const join = await Commuinty.findByIdAndUpdate({_id: communityID}, {
            $pull: {joinedUsers: userID}
        }, {new: true});

        res.status(200).json(join);
        
    } catch (error) {
        res.json(error)   
    }
};

const getJoinedCommunities = async (req, res) => {
    
    const { userID } = req.user;
    
    try {
        const comm = await Commuinty.find({joinedUsers: userID});
        if(comm.length === 0){
            return res.status(200).send('no joined communities found for this user')
        }

        res.status(200).json(comm);
    } catch (error) {
        res.status(400).json(error);
    }
};

const getMyCommunities = async (req, res) => {

    const {userID} = req.params;
    
    try {
        const comm = await Commuinty.find({createdBy: userID});
        res.status(200).json(comm);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { getAllCommunities, getJoinedCommunities, getMyCommunities, getSingleCommunity, createCommunity, editCommunity, deleteCommunity, joinCommunity, leaveCommunity };