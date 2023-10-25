const { model, Schema } = require('mongoose')

const contractSchema = new Schema({
    insuranceCompany: String,
    product: {},
    ppp1: Number,
    ppp2: Number,
    ppp3: Number,
    ppp4: Number,
    duration: String,
    enrolled: []
})

module.exports = model('Contract', contractSchema)
