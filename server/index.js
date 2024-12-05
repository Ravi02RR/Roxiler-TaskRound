//npm packages
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')

//setup dot env 
dotenv.config()

//methods 
const connectDB = require('./db/db');
const sendDataToDb = require('./db/sendDataToDb')


const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


//routes
const ProductRouter = require('./routes/products.route')


//setup of routes
app.use('/api/v1', ProductRouter)









async function startHttpServer() {
    try {
        await connectDB(process.env.MONOGURI)
        console.log('Connected to MongoDB')

        //initialize the database with the data from the json file
        // await sendDataToDb()


        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        })

    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }
}


//start service

startHttpServer()