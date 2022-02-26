const express = require('express')
const flash = require('connect-flash')
const Pedido = require('../models/pedidos')

const nuevoRegistro = async ( req,res ) => {
    const body = req.body
    const moso = 505
    const data = { moso, ...body }

    const pedido = new Pedido( data )
    await pedido.save()

    req.flash('success','Se ha registrado con exito la orden de la mesa ' + body.mesa )
    res.redirect('./nuevo')
}

module.exports = nuevoRegistro