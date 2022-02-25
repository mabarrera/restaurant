const helpers = {}

helpers.mesas = () => {
    const mesas = [
        { numero: 1, estado: true},
        { numero: 2, estado: true},
        { numero: 3, estado: true},
        { numero: 4, estado: true},
        { numero: 5, estado: true},
        { numero: 6, estado: true},
        { numero: 7, estado: true},
        { numero: 8, estado: true},
        { numero: 9, estado: true},
        { numero: 10, estado: true},
        { numero: 11, estado: true},
        { numero: 12, estado: true},
        { numero: 13, estado: false},
        { numero: 14, estado: false},
        { numero: 15, estado: false},

    ]
    return mesas
}

helpers.bebidas = () => {
    const bebidas = [
        { codigo: 'ffb01', nombre: 'gaseosa coca cola 1 LT', precio: '7.5', stock: 5},
        { codigo: 'ffb02', nombre: 'gaseosa coca cola 500 ML', precio: '3.5', stock: 10 },
        { codigo: 'ffb03', nombre: 'gaseosa inca cola 1 Lt', precio: '6.5', stock: 15 },
        { codigo: 'ffb04', nombre: 'gaseosa inca cola 500 ML', precio: '2.5', stock: 2 },
        { codigo: 'ffb05', nombre: 'chicha morada 1 LT', precio: '9.00', stock: 7 },
        { codigo: 'ffb06', nombre: 'Limonada 1 LT', precio: '8.0', stock: 8 },
    ]
        
    return bebidas
}

helpers.platos = () => {
    const platos = [
        { codigo: 'ffp01', tipo: 'carta', nombre: 'Bisteck', extras:'papas y ensalada', precio: '18.5', stock: 4},
        { codigo: 'ffp02', tipo: 'carta', nombre: 'Lomo saltado', extras:'arroz y papas o ensalada', precio: '19.0', stock: 5 },
        { codigo: 'ffp03', tipo: 'carta', nombre: 'Arroz chaufa de carne', extras:'arroz, papas o ensalada', precio: '18.0', stock: 6 },
        { codigo: 'ffp04', tipo: 'carta', nombre: 'Pollo a la parrila', extras:'', precio: '15.5', stock: 5 },
        { codigo: 'ffp05', tipo: 'carta', nombre: 'Filete de pechuga a la plancha', extras:'arroz y ensalada', precio: '17.0', stock: 9 },
        { codigo: 'ffp06', tipo: 'menu', nombre: 'Pollo a la olla', extras:'papa, arroz y ensalada', precio: '9.0', stock: 5 },
        { codigo: 'ffp07', tipo: 'menu', nombre: 'Seco de res', extras:'papa, arroz y ensalada', precio: '9.0', stock: 8 },
        { codigo: 'ffp08', tipo: 'menu', nombre: 'Caldo de gallina', extras:'papa, arroz y ensalada', precio: '10.0', stock: 5 },
        { codigo: 'ffp09', tipo: 'menu', nombre: 'Pure con bistck', extras:'papa, arroz y ensalada', precio: '9.0', stock: 2 },
        { codigo: 'ffp010', tipo: 'menu', nombre: 'Pollo a la norteña', extras:'papa, arroz y ensalada', precio: '9.0', stock: 5 },
    ]
        
    return platos
}

helpers.entradas = () => {
    const entradas = [
        { codigo: 'ffe01', nombre: 'Sopa a la minuta', precio: '2.5', stock: 5 },
        { codigo: 'ffe02', nombre: 'Ensalada Waldorf',  precio: '5.5', stock: 6 },
        { codigo: 'ffe03', nombre: 'Ensalada mixta', precio: '3.0', stock: 5 },
        { codigo: 'ffe04', nombre: 'Ensalada rusa', extras:'', precio: '2.5', stock: 3 },
        { codigo: 'ffe05', nombre: 'Causa rellena', extras:'arroz y ensalada', precio: '3.0', stock: 5 },
        { codigo: 'ffe06', nombre: 'Papa rellena', precio: '3.0', stock: 4 },
        { codigo: 'ffe07', nombre: 'Tequeños fritos', precio: '3.0', stock: 3 },
        { codigo: 'ffe08', nombre: 'Palta rellena', precio: '3.0', stock: 2 },
    ]
        
    return entradas
}

module.exports = helpers