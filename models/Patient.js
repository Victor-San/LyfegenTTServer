const { model, Schema } = require('mongoose')

const patientSchema = new Schema({
    insuranceCompany: String,
    cancerStage: String,
    age: Number,
    product: {},
    treatmentStart: String,
    os: String,
    pfs: String
})

module.exports = model('Patient', patientSchema)
