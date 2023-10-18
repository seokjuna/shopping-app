const mongoose = require("mongoose");

// 스키마 생성
const paymentSchema = mongoose.Schema({
    user: {
        type: Object
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }
}, { timestamps: true })

// 모델 생성
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;