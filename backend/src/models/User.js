const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// 스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        uinique: true,
    },
    password: {
        type: String,
        minLength: 6
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String
})

userSchema.pre('save', async function(next) {
    let user = this;

    if (user.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next();
})

// 모델 생성
const User = mongoose.model("User", userSchema);

module.exports = User;