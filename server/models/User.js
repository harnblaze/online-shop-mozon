const {Schema, model} = require('mongoose')

const schema = new Schema({
    firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model("User", schema)
