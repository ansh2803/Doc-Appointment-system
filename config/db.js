const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    try {
        console.log("Mongo URI from env:", process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongodb connected ${mongoose.connection.host}`.bgGreen.white)

    } catch (error) {
        console.log(`mongodb server Issue ${error}`.bgRed.white)
        process.exit(1)
    }
};

module.exports = connectDB;