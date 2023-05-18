const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/Authentication')
const { getAllPosts, getCommunityRelatedPost, getUserLikedPosts, getUserRelatedPosts, createPost, editPost, deletePost } = require('../controllers/Post')

router.get('/', getAllPosts);
router.get('/userPosts', Authentication, getUserRelatedPosts);
router.get('/:communityID', getCommunityRelatedPost);
router.get('/user/:userID', getUserLikedPosts);
router.post('/', createPost);
router.patch('/:id', editPost);
router.delete('/:id', deletePost);

module.exports = router;