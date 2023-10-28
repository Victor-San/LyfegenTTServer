const { model, Schema } = require('mongoose')

const patientSchema = new Schema({
    insuranceCompany: String,
    cancerStage: String,
    age: Number,
    product: {},
    treatmentStart: String,
    death: String,
    progression: String
})

module.exports = model('Patient', patientSchema)
