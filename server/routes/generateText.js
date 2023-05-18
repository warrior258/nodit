const express = require('express');
const router = express.Router();
const createText = require('../controllers/generateText')

router.get('/', createText);

module.exports = router;