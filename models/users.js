const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true, default: 'User'},
    age: {type: Number, required: true, min: [16, 'Too Young'], max: [100, 'Too Elder'], default: 19}
})

exports.User = mongoose.model('User', userSchema)