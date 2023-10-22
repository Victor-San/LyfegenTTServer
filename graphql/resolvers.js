const Product = require('../models/Product')

module.exports = {
    Query: {
        async product(_, { ID }) {
            return await Product.findById(ID)
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
            console.log(res)
            return {
                id: res.id,
                ...res._doc     // _doc is the properties of the mongoose model
            }
        },
        async deleteProduct(_, { ID }) {
            const wasDeleted = (await Product.deleteOne({ _id: ID })).deletedCount    // _id is the mongodb provided id

            return wasDeleted;      // 1 if something was deleted, 0 if not
        }
    }
}
