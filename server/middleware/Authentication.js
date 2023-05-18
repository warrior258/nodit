const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if(authorization && authorization.startsWith('Bearer ')){
            const token = await authorization.split(' ')[1];
            const user = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = {userID: user.userID, name: user.name, email: user.email};
            next();
        }else{
            res.status(400).send('Token Does not Exist!');
        }
    } catch (error) {
        res.status(401).send('Unauthorized!')
    }
}

module.exports = verifyToken;