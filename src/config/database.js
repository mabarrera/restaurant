const mongoose = require('mongoose')
const config = require('./config')

const dbConnection = async () => {
    try {
        await mongoose.connect( config.mongo,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        } )
        console.log('BD Connected');
    } catch (err) {
        console.log( err );
        throw new Error('Error al iniciar BD')
    }
}

module.exports = { 
    dbConnection
}