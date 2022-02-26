const express = require('express')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const socketIO = require('socket.io')

const config = require('./config/config')
const { dbConnection } = require('./config/database')
const helpers = require('./lib/helpers')

//Initializations
const app = express()
dbConnection()

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
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
// app.use(methodOverride('_method'))
app.use(express.json())
app.use(session({
    secret: 'sesionRestaurant2021',
    resave: false,
    saveUninitialized: false
}));


//Global variables
app.use((req,res,next) => {
    app.locals.success = req.flash('success')
    app.locals.info = req.flash('info')
    app.locals.warning = req.flash('warning')
    next() 
})


//Routes
app.use(require('./routes/index.routes'))
app.use('/pedidos', require('./routes/pedidos.routes'))


//Publics
app.use(express.static(path.join(__dirname, 'public')))


//Starting server
const server = app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));
})


//Socket IO
const io = socketIO(server);
io.on('connection', (socket) => {
    console.log('a socket connection', socket.id);

    socket.on('verificar categoria', async ( data ) => {
        const categoria = data.categoria
        const index = data.index
        const productos = helpers.productos().filter( item => item.categoria === categoria )
        io.emit('productos', { productos,categoria,index })
    })

    socket.on('verificar producto', (data) => {
        const codigo = data.producto
        const index = data.index
        const producto = helpers.productos().filter( item => item.codigo === codigo )
        io.emit('canasta', { producto,index } )
    })
})


