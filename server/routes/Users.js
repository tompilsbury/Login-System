const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const isUniqueUser = async (username) => {
    const userNum = await Users.count({ where: {username: username } });
    if (userNum > 0) {
        return false;
    } else{
        return true
    }
};

router.get('/', async (req, res) => {
    const usersList = await Users.findAll();
    res.json(usersList);
});

router.post('/register', async (req, res) => {
    const {username, password} = req.body;
    if (await isUniqueUser(username)){
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
            });
            res.json({
                success: true,
                username: username, 
            });
        });
    } else {
        res.json({success: false, reason:"Username is not unique."})
    }
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    const user = await Users.findOne({where: {username: username}});
    if (!user) res.json({ error: "User Doesn't Exist" });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Username or password was incorrect" });

        const jwtToken = jwt.sign(
            {username: username}, "secret"
        );

        res.json({
            success: true,
            username: username,
            token: jwtToken,
        });
    });
});


module.exports = router;