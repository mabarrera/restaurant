const { Schema,model } = require( 'mongoose')

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ]
    },
    usuario: {
        type: String,
        required: [ true, 'El usuario es obligatorio' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es onligatoria' ]
    }
})

const usuario = model( 'Usuario', usuarioSchema )

module.exports = usuario