const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {
    res.render('index')
})
router.post('/', (req,res) => {
    const body = req.body
    
    if( body.usuario === 'jhonDoe' && body.password === 'Jhon2022' ){
        res.redirect('./pedidos') 
    }
    
    req.flash('warning','Los datos no son los correctos' )
    res.redirect('./') 
})

module.exports = router