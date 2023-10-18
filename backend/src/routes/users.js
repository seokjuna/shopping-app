const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

router.get('/auth', auth, async (req, res, next) => {
    // 데이터는 미들웨어에서 가져옴
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
})

router.post('/register', async (req, res, next) => {
    // 모델을 이용해서 유저 데이터를 저장
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})

router.post('/login', async (req, res, next) => {
    try {
        // 존재하는 유저인지 체크
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(400).send("Auth failed, email not found");
        }

        // 비밀번호가 올바른 것인지 체크
        const isMatch = await user.comparePassword(req.body.password);
        if(!isMatch) {
            return res.status(400).send("Wrong Password");
        }

        const payload = {
            userId: user._id.toHexString(),
        }
        // token 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.json({ user, accessToken});
    } catch (error) {
        next(error);
    }
})

router.post('/logout', auth, async (req, res, next) => {
    // 모델을 이용해서 유저 데이터를 저장
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})



module.exports = router;