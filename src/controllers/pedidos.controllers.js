const express = require('express')
const flash = require('connect-flash')
const Ventas = require('../models/ventas')
const Pedidos = require('../models/pedidos')

const nuevoRegistro = async ( req,res ) => {
    const body = req.body
    if( body.mesa && body.producto ){
        const moso = 505   
        const data = { cantidad: body.registros, mesa: body.mesa, total: body.total, moso }
        const ventas = new Ventas(data)
        const saved = await ventas.save()
        
        if( body.registros > 1){
            body.producto.map( async (item,index )=> {
                const data = { venta: saved._id, producto: body.producto[index], cantidad: body.cantidad[index], precio: body.precio[index], importe: body.importe[index] }
                const pedidos = new Pedidos( data )
                await pedidos.save()
            })
        } else {
            const data = { venta: saved._id, ...body }
            const pedidos = new Pedidos( data )
            await pedidos.save()
        }
        
        req.flash('success','Se ha registrado con exito el pedido de la mesa ' + body.mesa )
        res.redirect('./actualizar/'+saved._id)    
    } else {
        req.flash('warning','Faltas datos!, verifique si ha seleccionado una mesa y al menos un producto')
        res.redirect('./nuevo')
    }
}

const actualizarRegistro = async (req,res) => {
    const codigo = req.params.codigo
    const body = req.body
    const cantidad = body.registros
    const total = body.total

    if( cantidad > 1){
        body.producto.map( async (item,index )=> {
            const uid = body.producto[index];
            const data = { cantidad: body.cantidad[index], importe: body.importe[index]}
            await Pedidos.updateOne({ _id: uid }, data )
        })
    } else {
        const uid = body.producto
        await Pedidos.updateOne({ _id: uid }, body )
    }
    const ventas = {
        cantidad,
        total,
        mesa: body.mesa
    }
    await Ventas.updateOne({ _id: codigo }, ventas )

    req.flash('success','Se ha actualizado el pedido de la mesa ' + body.mesa )
    res.redirect('./' + codigo) 
}

const pagarPedido = async (req,res) => {
    const codigo = req.params.codigo
    const venta = {
        pagado: true,
        fecha: new Date()
    }
    const result = await Ventas.findById(codigo)
    if( !result.pagado ){
        await Ventas.updateOne({ _id: codigo }, venta )
        req.flash('success','Se ha pagado la mesa ' + result.mesa )
    } else {
        req.flash('warning','la mesa ' + result.mesa + ' ya ha sido pagado' )
    }
   
    res.redirect('../') 
}

module.exports = {
    nuevoRegistro,
    actualizarRegistro,
    pagarPedido
}