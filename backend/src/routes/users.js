const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const Product = require('../models/Product');

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

router.post('/cart', auth, async (req, res, next) => {
    try {
        // 먼저 User Collection에 해당 유저의 정보 가져오기
        const userInfo = await User.findOne({ _id: req.user._id })

        // 가져온 정보에서 카트에 넣으려는 상품이 이미 들어있는지 확인
        let duplicate = false;
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId) {
                duplicate = true;
            }
        })

        // 상품이 이미 존재할 때
        if(duplicate) {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id, "cart.id": req.body.productId },
                { $inc: { "cart.$.quantity": 1} },
                { new: true }
            )

            return res.status(201).send(user.cart);
        }
        // 상품이 존재하지 않을 때
        else {
            const user = await User.findOneAndUpdate(
                { _id: req.user._id },
                { 
                    $push: {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true }
            )

            return res.status(201).send(user.cart);
        }

    } catch (error) {
        next(error);
    }
})

router.delete('/cart', auth, async (req, res, next) => {
    try {
        // 먼저 cart 안에 삭제하려고 하는 상품 지워주기
        const userInfo = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$pull":
                { "cart": { "id": req.query.productId } }
            },
            { new: true }
        )

        const cart = userInfo.cart;
        const array = cart.map(item => {
            return item.id;
        })

        // product collection에서 현재 남아있는 상품 정보 가져오기
        // productIds = ['', '']
        const productInfo = await Product
            .find({ _id: { $in: array } })
            .populate('writer')
        
        return res.status(200).json({
            productInfo,
            cart
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;