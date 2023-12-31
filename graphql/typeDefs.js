const { gql } = require('apollo-server')

module.exports = gql`
    type Product {
        _id: ID!
        brand: String!
        solution: String!
        packSize: Int!
        price: Float!
    }

    type Patient {
        _id: ID!
        insuranceCompany: String!
        cancerStage: Int!
        age: Int!
        product: Product!
        treatmentStart: String!
        death: String
        progression: String
    }

    type Contract {
        _id: ID!
        insuranceCompany: String!
        product: Product!
        ppp1: Float!
        ppp2: Float!
        ppp3: Float!
        ppp4: Float!
        duration: String!
        enrolled: [Patient]!
        payable: Float!
        refundable: Float!
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
        death: String
        progression: String
    }

    input ContractInput {
        insuranceCompany: String!
        product: ProductInput!
        ppp1: Float!
        ppp2: Float!
        ppp3: Float!
        ppp4: Float!
        duration: String!
    }

    type Query {
        allProducts: [Product]!
        allPatients: [Patient]!
        allContracts: [Contract]!
        getContractStatus: [Contract]!
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product!
        deleteProduct(productInput: ProductInput): Boolean

        createPatient(patientInput: PatientInput): Patient!
        deletePatient(patientInput: PatientInput): Boolean

        createContract(contractInput: ContractInput): Contract!
        deleteContract(ID: ID!): Boolean
    }
`
