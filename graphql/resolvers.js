const Product = require('../models/Product')
const Patient = require('../models/Patient')

module.exports = {
    Query: {
        async allProducts(_) {
            return await Product.find()
        },
        async allPatients(_) {
            return await Patient.find()
        }
    },
    Mutation: {
        async createProduct(_, {productInput: {brand, solution, packSize, price}}) {

            const createdProduct = new Product({
                brand: brand,
                solution: solution,
                packSize: packSize,
                price: price
            })

            const res = await createdProduct.save(); // MongoDB Saving
            return {
                id: res.id,
                ...res._doc     // _doc is the properties of the mongoose model
            }
        },
        async createPatient(_, {patientInput: {insuranceCompany, cancerStage, age, product, treatmentStart, os, pfs}}) {

            const createdPatient = new Patient({
                insuranceCompany: insuranceCompany,
                cancerStage: cancerStage,
                age: age,
                product: product,
                treatmentStart: treatmentStart,
                os: os,
                pfs: pfs
            })

            const res = await createdPatient.save();
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteProduct(_, { productInput: {brand, solution, packSize, price} }) {
            const wasDeleted = (await Product.deleteOne({ brand: brand, solution: solution, packSize: packSize, price: price })).deletedCount // _id is the mongodb provided id

            return wasDeleted; // 1 if something was deleted, 0 if not
        },
        async deletePatient(_, { patientInput: {insuranceCompany, cancerStage, age, product, treatmentStart, os, pfs} }) {
            const wasDeleted = (await Patient.deleteOne({ 
                insuranceCompany: insuranceCompany,
                cancerStage: cancerStage,
                age: age, 
                product: product,
                treatmentStart: treatmentStart,
                os: os,
                pfs: pfs
            })).deletedCount

            return wasDeleted;
        }
    }
}
