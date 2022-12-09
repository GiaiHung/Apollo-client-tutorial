const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
require('dotenv').config()
require('colors')
const schema = require('./schema/schema')
const PORT = process.env.PORT || 5000
const connectDB = require('./config/connectDb')

const app = express()

connectDB()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
