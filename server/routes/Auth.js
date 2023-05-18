const express = require('express');
const router = express.Router();

const { login, register, getUser } = require('../controllers/Auth');

router.get('/user/:id', getUser);
router.post('/login', login);
router.post('/register', register);

module.exports = router;