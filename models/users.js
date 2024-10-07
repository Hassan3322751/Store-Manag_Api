const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true, default: 'User'},
    email: {type: String, required: true},
    password: {type: Number, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
})

exports.User = mongoose.model('User', userSchema)