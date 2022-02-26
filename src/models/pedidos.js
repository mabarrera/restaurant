const { Schema,model } = require( 'mongoose')

const pedidosSchema = new Schema({
    mesa: {
        type: Number,
        required: [ true, 'La mesa es obligatorio' ]
    },
    producto: {
        type: String
    },
    cantidad: {
        type: Number,
    },
    moso: {
        type: Number,
    }
})

const pedidos = model ( 'Pedido', pedidosSchema )

module.exports = pedidos