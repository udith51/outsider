const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType, category, phone } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const newUser = new User({
            name, email, password: hashedPwd, userType, category, phone
        })
        const user = await newUser.save();
        return res.status(200).json({ name: user.name, email: user.email, category: user.category, userType: user.userType, phone: user.phone, userId: user._id });

    } catch (e) {
        console.log(e);
        if (e.message && e.message.includes('Password must be at least 8 characters long.')) {
            return res.status(400).json(e.message);
        }
        if (e.code === 11000)
            return res.status(500).json("User account already exists. Try login!");
        else
            return res.status(500).json(e);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password, userType } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(500).json("User does not exist. Do register first!");
        const regUserType = await user.userType;
        if (regUserType !== userType) return res.status(500).json("Not a valid user. Enter correct details.");
        const validPsd = await bcrypt.compare(password, user.password);
        if (!validPsd) return res.status(500).json("Wrong Password.");
        return res.status(200).json({ name: user.name, email: user.email, category: user.category, userType: user.userType, phone: user.phone, userId: user._id });
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