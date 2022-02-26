const { Schema,model } = require( 'mongoose')

const pedidosSchema = new Schema({
    venta: {
        type: Schema.Types.ObjectId,        
    },
    producto: {
        type: String
    },
    cantidad: {
        type: Number,
    },
    importe:{
        type: Number
    }
})

const pedidos = model ( 'Pedido', pedidosSchema )

module.exports = pedidos