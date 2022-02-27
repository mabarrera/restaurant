const { Schema,model } = require( 'mongoose')

const ventasSchema = new Schema({
    mesa: {
        type: Number,
        required: [ true, 'La mesa es obligatorio' ]
    },
    cantidad: {
        type: Number,
    },
    total: {
        type: Number,
    },
    pagado: {
        type: Boolean, 
        default: false,       
    },
    moso: {
        type: Number,
    },
    fecha: { 
        type: Date,
        default: Date.now
    },
})

const ventas = model ( 'Venta', ventasSchema )

module.exports = ventas