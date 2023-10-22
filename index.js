const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')

const MONGODB = "mongodb+srv://victor_sand:mongopass@cluster0.sypvnx0.mongodb.net/?retryWrites=true&w=majority"

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoConnection succ")
        return server.listen({port:5000})
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
