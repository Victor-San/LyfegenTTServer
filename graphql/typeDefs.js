const { gql } = require('apollo-server')

module.exports = gql`
    type Product {
        brand: String
        solution: String
        packSize: Int
        price: Float
    }

    input ProductInput {
        brand: String!
        solution: String!
        packSize: Int!
        price: Float!
    }

    type Query {
        product(ID: ID!): Product!
        allProducts: [Product!]!
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product!
        deleteProduct(ID: ID!): Boolean
    }
`
