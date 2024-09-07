const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true, unique: [true, 'This product is already available']},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true, min: [1, 'Quantity cannot be and not be less than 0']},
    image: {type: String, required: true},
    favourite: {type: Boolean, default: false},
})

exports.Product = mongoose.model('Product', productSchema)