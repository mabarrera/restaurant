const express = require('express')
const flash = require('connect-flash')
const Ventas = require('../models/ventas')
const Pedido = require('../models/pedidos')

const nuevoRegistro = async ( req,res ) => {
    const body = req.body
    if( body.mesa && body.producto ){
        const moso = 505   
        const data = { cantidad: body.registros, mesa: body.mesa, moso }
        const ventas = new Ventas(data)
        const saved = await ventas.save()
        
        if( body.registros > 1){
            body.producto.map( async (item,index )=> {
                const data = { venta: saved._id, producto: body.producto[index], cantidad: body.cantidad[index], importe: body.importe[index] }
                const pedido = new Pedido( data )
                await pedido.save()
            })
        } else {
            const data = { venta: saved._id, ...body }
            const pedido = new Pedido( data )
            await pedido.save()
        }
        
        req.flash('success','Se ha registrado con exito la orden de la mesa ' + body.mesa )
        res.redirect('./actualizar/'+saved._id)    
    } else {
        req.flash('warning','No se pueden guardar los datos, verifique si ha seleccionado una mesa y al menos un producto')
        res.redirect('./nuevo')
    }
    
}

module.exports = nuevoRegistro