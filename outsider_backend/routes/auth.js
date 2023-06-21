const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType, dealsIn, phone } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUser = new User({
            name, email, password: hashedPwd, userType, dealsIn, phone
        })
        const user = await newUser.save();
        return res.status(200).json(user);

    } catch (e) {
        if (e.code === 11000)
            return res.status(500).json("User account already exists");
        else
            return res.status(500).json(e);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) return res.status(404).json("User does not exist");
        const validPsd = await bcrypt.compare(password, user.password);
        if (!validPsd) return res.status(400).json("Wrong Password");
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e);
    }
})

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json(e);
    }
})

module.exports = router;