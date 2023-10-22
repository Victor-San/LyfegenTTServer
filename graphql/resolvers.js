const Product = require('../models/Product')
const Patient = require('../models/Patient')

module.exports = {
    Query: {
        async product(_, { ID }) {
            return await Product.findById(ID)
        },
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
        async deleteProduct(_, { productInput: {brand, solution, packSize, price} }) {
            const wasDeleted = (await Product.deleteOne({ brand: brand, solution: solution, packSize: packSize, price: price })).deletedCount    // _id is the mongodb provided id

            return wasDeleted;      // 1 if something was deleted, 0 if not
        }
    }
}
