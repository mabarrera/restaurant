import { Schema,model } from 'mongoose'

const ordenSchema = new Schema({
    mesa: {
        type: Number,
        required: [ true, 'La mesa es obligatorio' ]
    },
    plato: {
        type: String
    },
    cantidad: {
        type: Number,
    },
    bebidas: {
        type: String,
    },
    moso: {
        type: String,
    }
})

const orden = model ( 'Ordene', ordenSchema )

module.exports = orden