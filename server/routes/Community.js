const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/Authentication')

const { 
    getAllCommunities, 
    getJoinedCommunities,
    getMyCommunities,
    getSingleCommunity, 
    createCommunity, 
    editCommunity, 
    deleteCommunity, 
    joinCommunity, 
    leaveCommunity 
} = require('../controllers/Community');

router.get('/', getAllCommunities);
router.get('/joinedCommunities', Authentication, getJoinedCommunities);
router.get('/my/:userID', getMyCommunities);
router.get('/:id', getSingleCommunity);
router.post('/', createCommunity);
//to join and leave community
router.patch('/join', joinCommunity);
router.patch('/leave', leaveCommunity);

router.patch('/:id', editCommunity);


router.delete('/:id', deleteCommunity);

module.exports = router;

