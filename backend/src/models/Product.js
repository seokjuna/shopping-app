const { default: mongoose, Schema } = require("mongoose");

// 스키마 생성
const productSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 30
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
})

productSchema.index({
    title: 'text',
    description: 'text'
},{
    weights: {
        title: 5,
        description: 1
    }
})


// 모델 생성
const Product = mongoose.model("Product", productSchema);

module.exports = Product;