const { model, Schema } = require('mongoose')

const productSchema = new Schema({
    brand: String,
    solution: String,
    packSize: Number,
    price: Number
})

module.exports = model('Product', productSchema)
