const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')

//dotenv config
dotenv.config()

//rest object
const app = express()
//middleware
app.use(express.json())
app.use(morgan('dev'))
//mongodb connection
const connectDB = require('./config/db')
connectDB()
//routes
app.use('/api/v1/user', require('./routes/userRoutes'))

//port
const port = process.env.PORT || 8080
//listen port
app.listen(port, ()=>{
    console.log(`Server Running in ${process.env.NODE_ENV} Mode on port ${process.env.PORT}`.bgCyan.white)
})

