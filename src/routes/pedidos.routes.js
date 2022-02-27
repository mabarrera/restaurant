const express = require('express');
const { nuevoRegistro, actualizarRegistro, pagarPedido } = require('../controllers/pedidos.controllers');
const router = express.Router()
const Ventas = require('../models/ventas')
const Pedidos = require('../models/pedidos')

const helpers = require('../lib/helpers')

router.get('/', async (req,res) => {
    const ventas = await Ventas.find().lean()    
    const pedidos = ventas.map( item => {
        item.total = item.total.toFixed(2)
        const imagen = ( item.pagado ) ? 'ocupado' : 'disponible'
        const fecha = new Date(item.fecha)
        const registro = `${fecha.getDate()} / ${fecha.getMonth() + 1} / ${fecha.getFullYear()}`
        const hora = `${fecha.getHours()}:${fecha.getMinutes()}`
        return { imagen,registro,hora,  ...item }
    })
    
    res.render('pedidos/lista', { pedidos })
})

router.get('/nuevo', (req,res) => {
    const mesas = helpers.mesas()
    const carta = helpers.productos().filter( item => item.categoria === 'carta')
    res.render('pedidos/nuevo', {title:'Registrar pedido', mesas, carta })
})

router.post('/nuevo', nuevoRegistro)

router.get('/actualizar/:codigo', async (req,res) => {
    const uid = req.params.codigo
    
    const venta = await Ventas.findById( uid ).lean()
    const mesa = venta.mesa
    const pedido = venta._id
    
    const mesas = helpers.mesas().map( item => {
        const estado = ( item.numero === mesa ) ? 'selected' : item.estado
        return { numero: item.numero, estado }
    })
    const carta = helpers.productos().filter( item => item.categoria === 'carta')
    const pedidos = await helpers.pedidos( pedido )
        
    res.render('pedidos/actualizar', {title:'Actualizar pedido', uid, venta, pedidos, mesas, carta } )
})

router.post('/actualizar/:codigo', actualizarRegistro)

router.get('/pagar/:codigo',pagarPedido )

module.exports = router