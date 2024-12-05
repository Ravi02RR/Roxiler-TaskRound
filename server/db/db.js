const mongoose = require('mongoose')

async function connectDB(uri) {
    try {
        await mongoose.connect(uri)
    }
    catch (err) {
        console.log(Error)
    }
}

module.exports = connectDB