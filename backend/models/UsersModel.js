const mongoose = require("mongoose")
const Schema = mongoose.Schema // a schema defines the structure of a type of document inside the database

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

module.exports = User