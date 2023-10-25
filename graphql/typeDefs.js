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

    type Contract {
        insuranceCompany: String!
        product: Product!
        ppp1: Float!
        ppp2: Float!
        ppp3: Float!
        ppp4: Float!
        duration: String!
        enrolled: [Patient]!
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

    input ContractInput {
        insuranceCompany: String!
        product: ProductInput!
        ppp1: Float!
        ppp2: Float!
        ppp3: Float!
        ppp4: Float!
        duration: String!
        enrolled: [PatientInput]
    }

    type Query {
        allProducts: [Product]!
        allPatients: [Patient]!
        allContracts: [Contract]!
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product!
        deleteProduct(productInput: ProductInput): Boolean

        createPatient(patientInput: PatientInput): Patient!
        deletePatient(patientInput: PatientInput): Boolean
    }
`
