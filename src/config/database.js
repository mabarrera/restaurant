const mongoose = require('mongoose')
const config = require('./config')

const db = async () => {
    try {
        await mongoose.connect( config.mongo )
        console.log('BD Connected');
    } catch (err) {
        console.log( err );
        throw new Error('Error al iniciar BD')
    }
}

module.exports = db