import mongoose from "mongoose";

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
        minLength: 5
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String
})

// 모델 생성
const User = mongoose.model("User", userSchema);

module.exports = User;