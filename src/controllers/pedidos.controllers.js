const express = require('express')
const flash = require('connect-flash')
const Pedido = require('../models/pedidos')

const nuevoRegistro = async ( req,res ) => {
    const body = req.body
    if( body.mesa && body.producto ){
        const moso = 505
        const data = { moso, ...body }

        const pedido = new Pedido( data )
        await pedido.save()

        req.flash('success','Se ha registrado con exito la orden de la mesa ' + body.mesa )
        res.redirect('./nuevo')    
    } else {
        req.flash('warning','No se pueden guardar los datos, verifique si ha seleccionado una mesa y al menos un producto')
        res.redirect('./nuevo')
    }
    
}

module.exports = nuevoRegistro