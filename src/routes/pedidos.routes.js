const express = require('express')
const router = express.Router()

const helpers = require('../lib/helpers')

router.get('/', (req,res) => {
    res.render('pedidos/lista')
})

router.get('/nuevo', (req,res) => {
    const mesas = helpers.mesas().filter( item => item.estado === true )
    console.log(mesas);
    res.render('pedidos/nuevo', {title:'Registrar pedido', mesas })
})

module.exports = router