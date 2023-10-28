const Product = require('../models/Product')
const Patient = require('../models/Patient')
const Contract = require('../models/Contract')

function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (object1[key] !== object2[key]) {
            return false;
        }
    }

    return true;
}

module.exports = {
    Query: {
        async allProducts(_) {
            return await Product.find()
        },
        async allPatients(_) {
            return await Patient.find()
        },
        async allContracts(_) {
            return await Contract.find()
        },
        async getContractStatus(_) {
            const contracts = await Contract.find()
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
        async createPatient(_, {patientInput: {insuranceCompany, cancerStage, age, product, treatmentStart, death, progression}}) {
            const patientObject = {
                insuranceCompany: insuranceCompany,
                cancerStage: cancerStage,
                age: age,
                product: product,
                treatmentStart: treatmentStart,
                death: death,
                progression: progression
            }
            const createdPatient = new Patient(patientObject)
            
            const res = await createdPatient.save();

            if (age<55 && cancerStage<4) {
                const enrolledContracts = await Contract.find({ insuranceCompany: insuranceCompany, product: product })
                enrolledContracts.map((x) => {
                    x.enrolled = [...x.enrolled, {_id: res.id, ...patientObject}]
                    x.save()
                })
            }
            return {
                id: res.id,
                ...res._doc
            }
        },
        async createContract(_, {contractInput: {insuranceCompany, product, ppp1, ppp2, ppp3, ppp4 , duration}}) {

            const candidates = await Patient.find({insuranceCompany: insuranceCompany, product: product})
            const enrolled = candidates.filter((x) => {if(x.age<55 && x.cancerStage<4) return x})
            const createdContract = new Contract({
                insuranceCompany: insuranceCompany,
                product: product,
                ppp1: ppp1,
                ppp2: ppp2,
                ppp3: ppp3,
                ppp4: ppp4,
                duration: duration,
                enrolled: enrolled
            })

            const res = await createdContract.save();
            return {
                id: res.id,
                ...res._doc
            }
        },

        async deleteProduct(_, { productInput: {brand, solution, packSize, price} }) {
            const wasDeleted = (await Product.deleteOne({ brand: brand, solution: solution, packSize: packSize, price: price })).deletedCount // _id is the mongodb provided id

            return wasDeleted; // 1 if something was deleted, 0 if not
        },
        async deletePatient(_, { patientInput: {insuranceCompany, cancerStage, age, product, treatmentStart, death, progression} }) {
            const patientObject = { 
                insuranceCompany: insuranceCompany,
                cancerStage: cancerStage,
                age: age, 
                product: product,
                treatmentStart: treatmentStart,
                death: death,
                progression: progression
            }
            if (age<55 && cancerStage<4) {
                const enrolledContracts = await Contract.find({ insuranceCompany: insuranceCompany, product: product })
                enrolledContracts.map((x) => {
                    x.enrolled = x.enrolled.filter((x) => shallowEqual(x, patientObject))
                    x.save()
                })
            }
            const wasDeleted = (await Patient.deleteOne(patientObject)).deletedCount

            return wasDeleted;
        },
        async deleteContract(_, { ID }) {
            try {
              const wasDeleted = (await Contract.deleteOne({ _id: ID })).deletedCount;
              return wasDeleted;
            } catch (error) {
              console.error('Error deleting contract:', error);
              return false;
            }
        }
    }
}
