const express = require('express');
const router = express.Router();
const { getAllComments, getPostRelatedComments, createComment, deleteComment } = require('../controllers/Comments')

router.get('/', getAllComments);
router.get('/:communityID/:postID', getPostRelatedComments);
router.post('/', createComment);
router.delete('/:id', deleteComment);

module.exports = router;