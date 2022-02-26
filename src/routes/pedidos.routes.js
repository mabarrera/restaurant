const express = require('express');
const nuevoRegistro = require('../controllers/pedidos.controllers');
const router = express.Router()
const Ventas = require('../models/ventas')
const Pedidos = require('../models/pedidos')

const helpers = require('../lib/helpers')

router.get('/', (req,res) => {
    console.log('lista de pedidos');
    res.render('pedidos/lista')
})

router.get('/nuevo', (req,res) => {
    const mesas = helpers.mesas()
    const carta = helpers.productos().filter( item => item.categoria === 'carta')
    res.render('pedidos/nuevo', {title:'Registrar pedido', mesas, carta })
})

router.post('/nuevo', nuevoRegistro)

router.get('/actualizar/:codigo', async (req,res) => {
    const uid = req.params.codigo
    
    const venta = await Ventas.findById( uid )
    const mesa = venta.mesa
    const cantidad = venta.cantidad
    const importe = venta.importe
    const pedido = venta._id
    const pedidos = await Pedidos.find({ venta: pedido })
    console.log( pedidos );
    
    const mesas = helpers.mesas().map( item => {
        const estado = ( item.numero === mesa ) ? 'selected' : item.estado
        return { numero: item.numero, estado }
    })
    const carta = helpers.productos().filter( item => item.categoria === 'carta')

    res.render('pedidos/actualizar', {title:'Actualizar pedido', mesa, cantidad, importe, pedidos, mesas, carta } )
})

module.exports = router