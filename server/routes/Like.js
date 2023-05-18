const express = require('express');
const router = express.Router();
const { getAllLikes, createLike, deleteLike } = require('../controllers/Like')

router.get('/', getAllLikes);
router.patch('/', createLike);
router.patch('/unlike', deleteLike);

module.exports = router;