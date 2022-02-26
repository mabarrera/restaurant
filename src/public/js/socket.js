const socket = io()

//Seleccionar mesa
const mesas = () => {
    const mesas = document.querySelectorAll('.box-mesas')
    const title = document.querySelectorAll('.title-mesa')
    const numero = document.querySelectorAll('.numero-mesa')
    mesas.forEach( (mesa,index ) => {
        mesa.addEventListener('click', (e) => {
            const target = e.target
            if( !target.classList.contains('ocupado') ){
                const siblings = mesa.children
                for(let sibling of siblings){
                    if( sibling.classList.contains('selected') ){
                        sibling.classList.remove('selected')
                    }
                }
                target.classList.add('selected')
                numero[index].value = target.innerHTML   
                title[index].innerHTML = 'Mesa ' + target.innerHTML
            }
        })
    })
}
mesas()
//Seleccionar categorias
const categorias = () => {
    const categorias = document.querySelectorAll('.categorias-box')
    categorias.forEach( (item,index) => {
        item.addEventListener('click', (e) => {
            const target = e.target
            
            const siblings = item.children     
            for(let sibling of siblings){
                if( sibling.classList.contains('active') ){
                    sibling.classList.remove('active')
                }
            } 
            target.classList.add('active')   
            const categoria = target.dataset.name
            socket.emit('verificar categoria', { categoria,index })
        })
    })
}
categorias()

//Recibir los productos por categorias
socket.on('productos', ( data ) => {
    const productos = data.productos
    const categoria = data.categoria
    const index = data.index

    const title = ( categoria === 'carta' ) ? 'platos a la carta' : categoria    
    const carta = document.querySelectorAll('.categoria-title')[index]
    carta.setAttribute('class',`categoria-${categoria} categoria-title pv-1 text-bold text-capitalize`)
    
    carta.innerHTML = title

    const box = document.querySelectorAll('.box-productos')[index]

    box.innerHTML = ''
    for( let producto of productos ){
        const extra = ( producto.extras === '' || producto.extras === undefined ) ? '' : '<br>' + producto.extras
        const item = document.createElement('div')
        item.setAttribute('class','list-item categoria-item')
        item.dataset.index = producto.codigo

        const nombre = document.createElement('div')
        nombre.classList.add('categoria-option')
        nombre.innerHTML = producto.nombre + extra
        nombre.dataset.index = producto.codigo

        const precio = document.createElement('div')
        precio.classList.add('categoria-option')
        precio.append('S/. ',producto.precio)
        precio.dataset.index = producto.codigo

        item.append( nombre, precio )
        box.append(item)
    }
})


//Seleccionar producto
const productosCaja = () => {
    const productos = document.querySelectorAll('.box-productos')
    productos.forEach(( box,index ) => {
        box.addEventListener('click', (e) => {
            const target = e.target
            let producto = target.dataset.index
            
            socket.emit('verificar producto',{ producto,index })
            
        })
    } )
}
productosCaja()

let canasta = []
socket.on('canasta', (data) => {
    const index = data.index
    const producto =  data.producto[0]
    const nuevo = addCantidad( producto )
    if( nuevo ){
        canasta.push({ cantidad: 1, importe: producto.precio, ...producto })
    }

    generarCanaste( canasta,index )
    const groups = document.querySelectorAll('.input-group')
    const importe = document.querySelectorAll('.importe-canasta')
    const total = document.querySelectorAll('.total-pedido')
    const items = document.querySelectorAll('.cantidad-items')
    groups.forEach((group,i) => {
        group.addEventListener('click', (e) => {
            const input = group.children[1]
            const value = input.value
            const codigo = input.dataset.index
            
            for(let item of canasta){
                if( item.codigo === codigo){
                    item.cantidad = parseInt(value)
                    item.importe = item.precio * item.cantidad
                    importe[i].innerHTML = 'S/. ' + item.importe
                    total[index].innerHTML = 'S/. ' + totalCanasta(canasta)
                }                
            }
        })
    })

    const borrar = document.querySelectorAll('.borrar-item')
    borrar.forEach( item => {
        item.addEventListener('click', () => {
            const td = item.parentNode
            const tr = td.parentNode
            const codigo = item.dataset.index
            borrarItem(tr,codigo,canasta)
            total[index].innerHTML = 'S/. ' + totalCanasta(canasta)
            items[index].value = canasta.length
        })
    })
})

const addCantidad = ( producto ) => {
    let add = true
    const codigo = producto.codigo
    for( let item of canasta ){
        if( item.codigo === codigo ){
            item.cantidad = item.cantidad + 1
            item.importe = item.cantidad * item.precio
            add = false
        }
    }
    return add
}

const generarCanaste  = ( canasta,index ) => {
    const content = document.querySelectorAll('.content-canasta')[index]
    content.innerHTML = ''
    for(let item of canasta ){
        const tr = document.createElement('tr')

        const nombre = document.createElement('td')
        const inputNombre = document.createElement('input')
        inputNombre.setAttribute('name','producto')
        inputNombre.setAttribute('class','form-control producto')
        inputNombre.setAttribute('type','hidden')
        inputNombre.setAttribute('multiple','true')
        inputNombre.value = item.codigo

        nombre.append(item.nombre,inputNombre)

        const cantidad = document.createElement('td')
        const inputCantidad = document.createElement('input')
        inputCantidad.setAttribute('name','cantidad')
        inputCantidad.setAttribute('class','form-control cantidad')
        inputCantidad.value = item.cantidad
        inputCantidad.dataset.form = 'quantity'
        inputCantidad.dataset.index = item.codigo
        inputCantidad.setAttribute('min','1')
        inputCantidad.setAttribute('multiple','true')
        cantidad.append(inputCantidad)

        const importe = document.createElement('td')
        importe.setAttribute('class','text-center importe-canasta')
        importe.append('S/. ',item.importe)

        const action = document.createElement('td')
        action.classList.add('text-center')

        const btn = document.createElement('div')
        btn.setAttribute('class','btn btn-filling-danger borrar-item')
        btn.dataset.index = item.codigo

        const icon = document.createElement('i')
        icon.setAttribute('class','fo fo-times')
        btn.append(icon)
        action.append(btn)

        tr.append(nombre,cantidad,importe,action)
        content.append(tr)
        setQuantity(inputCantidad)
    }
    totalBoxCanaste(canasta,content)
}

const totalBoxCanaste = (canasta,content) => {
    const tr = document.createElement('tr')
    let monto = totalCanasta(canasta)
    
    const title = document.createElement('td')
    title.setAttribute('colspan','2')
    title.classList.add('text-right')
    title.append('Total')

    const total = document.createElement('td')
    total.setAttribute('class','text-right total-pedido text-bold')
    total.append('S/. ', parseFloat(monto).toFixed(2))

    const vacio = document.createElement('td')
    const input = document.createElement('input')
    input.setAttribute('class','form-control cantidad-items')
    input.setAttribute('name','registros')
    input.setAttribute('type','hidden')
    input.value = canasta.length
    vacio.append(input)
    
    tr.append(title,total,vacio)
    content.append(tr)
}
const borrarItem = (opcion,codigo,canasta) => {    
    let i = 0
    for(let item of canasta){
        if( item.codigo === codigo ){
            canasta.splice(i,1)
        }
        i++
    }
    opcion.remove()
}
const totalCanasta = ( canasta ) => {
    let total = 0
    canasta.map( item => {total = total + parseFloat(item.importe)} )
    return total
}