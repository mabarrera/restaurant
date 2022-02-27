const Ventas = require('../models/ventas')
const Pedidos = require('../models/pedidos')
const helpers = {}

helpers.mesas = () => {
    const mesas = [
        { numero: 1, estado: 'disponible'},
        { numero: 2, estado: 'disponible'},
        { numero: 3, estado: 'disponible'},
        { numero: 4, estado: 'disponible'},
        { numero: 5, estado: 'disponible'},
        { numero: 6, estado: 'ocupado'},
        { numero: 7, estado: 'disponible'},
        { numero: 8, estado: 'disponible'},
        { numero: 9, estado: 'disponible'},
        { numero: 10, estado: 'disponible'},
        { numero: 11, estado: 'ocupado'},
        { numero: 12, estado: 'disponible'},
        { numero: 13, estado: 'ocupado'},
        { numero: 14, estado: 'disponible'},
        { numero: 15, estado: 'ocupado'},

    ]
    return mesas
}

helpers.productos = () => {
    const productos = [
        { codigo: 'cfp01', categoria:'bebidas', nombre: 'Gaseosa coca cola 1 LT', precio: 7.5 },
        { codigo: 'cfp02', categoria:'bebidas', nombre: 'Gaseosa coca cola 500 ML', precio: 3.5 },
        { codigo: 'cfp03', categoria:'bebidas', nombre: 'Gaseosa inca cola 1 Lt', precio: 6.5 },
        { codigo: 'cfp04', categoria:'bebidas', nombre: 'Gaseosa inca cola 500 ML', precio: 2.5 },
        { codigo: 'cfp05', categoria:'bebidas', nombre: 'Chicha morada 1 LT', precio: 9.0 },
        { codigo: 'cfp06', categoria:'bebidas', nombre: 'Limonada 1 LT', precio: 9.0 },
        { codigo: 'cfp07', categoria:'carta', nombre: 'Bisteck', extras:'papas y ensalada', precio: 18.5 },
        { codigo: 'cfp08', categoria:'carta', nombre: 'Lomo saltado', extras:'arroz y papas o ensalada', precio: 19.0 },
        { codigo: 'cfp09', categoria:'carta', nombre: 'Arroz chaufa de carne', extras:'arroz, papas o ensalada', precio: 18.0 },
        { codigo: 'cfp010', categoria:'carta', nombre: 'Pollo a la parrila', extras:'', precio: '15.5' },
        { codigo: 'cfp011', categoria:'carta', nombre: 'Filete de pechuga a la plancha', extras:'arroz y ensalada', precio: 17.0 },
        { codigo: 'cfp012', categoria:'menu', nombre: 'Pollo a la olla', extras:'papa, arroz y ensalada', precio: 9.0 },
        { codigo: 'cfp013', categoria:'menu', nombre: 'Seco de res', extras:'papa, arroz y ensalada', precio: 9.0 },
        { codigo: 'cfp014', categoria:'menu', nombre: 'Caldo de gallina', extras:'papa, arroz y ensalada', precio: 10.0 },
        { codigo: 'cfp015', categoria:'menu', nombre: 'Pure con bistck', extras:'papa, arroz y ensalada', precio: 9.0 },
        { codigo: 'cfp016', categoria:'menu', nombre: 'Pollo a la norteña', extras:'papa, arroz y ensalada', precio: 9.0 },
        { codigo: 'cfp017', categoria:'entradas', nombre: 'Sopa a la minuta', precio: 2.5 },
        { codigo: 'cfp018', categoria:'entradas', nombre: 'Ensalada Waldorf',  precio: 5.5 },
        { codigo: 'cfp019', categoria:'entradas', nombre: 'Ensalada mixta', precio: 3.0 },
        { codigo: 'cfp020', categoria:'entradas', nombre: 'Ensalada rusa', extras:'', precio: 2.5 },
        { codigo: 'cfp021', categoria:'entradas', nombre: 'Causa rellena', extras:'arroz y ensalada', precio: 3.0 },
        { codigo: 'cfp022', categoria:'entradas', nombre: 'Papa rellena', precio: 3.0 },
        { codigo: 'cfp023', categoria:'entradas', nombre: 'Tequeños fritos', precio: 3.0 },
        { codigo: 'cfp024', categoria:'entradas', nombre: 'Palta rellena', precio: 3.0 },
    ]
    return productos
}

helpers.pedidos = async (pedido) => {
    const data = await Pedidos.find({ venta: pedido })

    const pedidos = data.map( item => {
        const producto = item.producto
        const productos = helpers.productos().filter( prod => prod.codigo === producto )
        
        const data = {
            uid: item._id,
            venta: item.venta,
            producto,
            nombre: productos[0].nombre,
            cantidad: item.cantidad,
            precio: item.precio,
            importe: item.importe
        }
        return data
    })
    return pedidos
}

helpers.actualizarPedidos = async (venta,producto) => {
    const pedido = await Pedidos.find({ venta,producto })

    if( pedido.length >= 1 ){
        //Actualizar el registro encontrado
        const uid = pedido[0]._id
        const cantidad = pedido[0].cantidad + 1
        const importe = cantidad * pedido[0].precio
        const body = { cantidad, importe }
        await Pedidos.updateOne({ _id: uid }, body)
    } else {
        //Guardar un nuevo registro
        const productos = helpers.productos().filter( prod => prod.codigo === producto )

        const data = {
            venta,
            producto,
            cantidad: 1,
            precio: productos[0].precio,
            importe: productos[0].precio
        }
        const pedido = new Pedidos( data )
        await pedido.save()
    }

    const updated = await Pedidos.find({ venta })
    let total = 0

    const pedidos = updated.map( item => {
        const producto = item.producto
        const productos = helpers.productos().filter( prod => prod.codigo === producto )
        total = total + item.importe
        const data = {
            codigo: item._id,
            venta: item.venta,
            producto,
            nombre: productos[0].nombre,
            precio: item.precio,
            cantidad: item.cantidad,
            importe: item.importe
        }
        return data
    })
    const ventas = {
        total,
        cantidad: pedidos.length
    }
    await Ventas.updateOne({ _id: venta }, ventas)

    return pedidos
}

helpers.borrarProducto = async (uid) => {
    const pedido = await Pedidos.find({ uid })
    const venta = pedido[0].venta
    await Pedidos.deleteOne({ _id: uid })

    const canasta = await Pedidos.find({ venta })
    const cantidad = canasta.length
    let total = 0
    canasta.map( item => total = total + item.importe)

    await Ventas.updateOne({ _id: venta }, {cantidad,total})
}

module.exports = helpers