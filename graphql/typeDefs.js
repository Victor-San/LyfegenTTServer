const { gql } = require('apollo-server')

module.exports = gql`
    type Product {
        brand: String!
        solution: String!
        packSize: Int!
        price: Float!
    }

    type Patient {
        diseaseStatus: String!
        product: Product!
        treatmentStart: String!
        os: Boolean!
        pfs: Boolean!
    }

    input ProductInput {
        brand: String!
        solution: String!
        packSize: Int!
        price: Float!
    }

    input PatientInput {
        diseaseStatus: String!
        product: ProductInput!
        treatmentStart: String!
        os: Boolean!
        pfs: Boolean!
    }

    type Query {
        product(ID: ID!): Product!
        allProducts: [Product]!
        allPatients: [Patient]!
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product!
        deleteProduct(productInput: ProductInput): Boolean

        createPatient(patientInput: PatientInput): Patient!
        deletePatient(patientInput: PatientInput): Boolean
    }
`
