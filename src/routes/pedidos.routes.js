const express = require('express');
const nuevoRegistro = require('../controllers/pedidos.controllers');
const router = express.Router()

const helpers = require('../lib/helpers')

router.get('/', (req,res) => {
    console.log('lista de pedidos');
    res.render('pedidos/lista')
})

router.get('/nuevo', (req,res) => {
    const mesas = helpers.mesas().map( item => {
        const estado = ( item.estado ) ? 'disponible' : 'ocupado'
        return { numero: item.numero, estado }
    })
    const carta = helpers.productos().filter( item => item.categoria === 'carta')
    res.render('pedidos/nuevo', {title:'Registrar pedido', mesas, carta })
})

router.post('/nuevo', nuevoRegistro)

router.get('/actualizar/:codigo', (req,res) => {
    res.render('pedidos/actualizar')
})

module.exports = router