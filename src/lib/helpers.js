const helpers = {}

helpers.mesas = () => {
    const mesas = [
        { numero: 1, estado: true},
        { numero: 2, estado: true},
        { numero: 3, estado: true},
        { numero: 4, estado: true},
        { numero: 5, estado: true},
        { numero: 6, estado: false},
        { numero: 7, estado: true},
        { numero: 8, estado: true},
        { numero: 9, estado: true},
        { numero: 10, estado: true},
        { numero: 11, estado: false},
        { numero: 12, estado: true},
        { numero: 13, estado: false},
        { numero: 14, estado: true},
        { numero: 15, estado: false},

    ]
    return mesas
}

helpers.productos = () => {
    const productos = [
        { codigo: 'cfp01', categoria:'bebidas', nombre: 'gaseosa coca cola 1 LT', precio: 7.5 },
        { codigo: 'cfp02', categoria:'bebidas', nombre: 'gaseosa coca cola 500 ML', precio: 3.5 },
        { codigo: 'cfp03', categoria:'bebidas', nombre: 'gaseosa inca cola 1 Lt', precio: 6.5 },
        { codigo: 'cfp04', categoria:'bebidas', nombre: 'gaseosa inca cola 500 ML', precio: 2.5 },
        { codigo: 'cfp05', categoria:'bebidas', nombre: 'chicha morada 1 LT', precio: 9.0 },
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



module.exports = helpers