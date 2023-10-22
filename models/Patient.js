const { model, Schema } = require('mongoose')

const patientSchema = new Schema({
    diseaseStatus: String,
    product: {},
    treatmentStart: String,
    os: Boolean,
    pfs: Boolean
})

module.exports = model('Patient', patientSchema)
