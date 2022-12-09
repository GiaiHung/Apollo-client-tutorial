const mongoose = require('mongoose')

const connectDB = async () => {
  mongoose.set('strictQuery', true)
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@graphql-tutorial.he7xyaa.mongodb.net/?retryWrites=true&w=majority`
  )

  console.log('Connected to MongoDB'.cyan.underline.bold)
}

module.exports = connectDB
