const { gql } = require('apollo-server')

module.exports = gql`
    type Product {
        brand: String!
        solution: String!
        packSize: Int!
        price: Float!
    }

    type Patient {
        insuranceCompany: String!
        cancerStage: Int!
        age: Int!
        product: Product!
        treatmentStart: String!
        os: String
        pfs: String
    }

    input ProductInput {
        brand: String!
        solution: String!
        packSize: Int!
        price: Float!
    }

    input PatientInput {
        insuranceCompany: String!
        cancerStage: Int!
        age: Int!
        product: ProductInput!
        treatmentStart: String!
        os: String
        pfs: String
    }

    type Query {
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
