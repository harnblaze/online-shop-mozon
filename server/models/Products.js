const {Schema, model} = require('mongoose')

const schema = new Schema({
    title: {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }, price: {
        type: Number,
        required: true
    }, discountPercentage: {
        type: Number,
        required: true
    }, rating: {
        type: Number,
        required: true
    }, stock: {
        type: Number,
        required: true
    }, brand: {
        type: String,
        required: true
    }, thumbnail: {
        type: String,
        required: true
    }, category:
        {type: Schema.Types.ObjectId, ref: 'Category'}
    ,
}, {
    timestamps: true
})

module.exports = model("Product", schema)
