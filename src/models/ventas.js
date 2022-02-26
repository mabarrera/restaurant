const { Schema,model } = require( 'mongoose')

const ventasSchema = new Schema({
    mesa: {
        type: Number,
        required: [ true, 'La mesa es obligatorio' ]
    },
    cantidad: {
        type: Number,
    },
    moso: {
        type: Number,
    }
})

const ventas = model ( 'Venta', ventasSchema )

module.exports = ventas