const express = require('express')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')

const config = require('./config/config')
const db = require('./config/database')

//Initializations
const app = express()


//Settings
app.set('port', config.port )
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')


//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())


//Routes
app.use(require('./routes'))
app.use('/registrar-orden', require('./routes/ordenes'))


//Publics
app.use(express.static(path.join(__dirname, 'public')))


//Starting server
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})


