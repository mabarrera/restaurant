const socket = io()

//Seleccionar mesa
const mesas = () => {
    const mesas = document.querySelectorAll('.box-mesas')
    const title = document.querySelectorAll('.title-mesa')
    const numero = document.querySelectorAll('.numero-mesa')
    mesas.forEach( (mesa,index ) => {
        mesa.addEventListener('click', (e) => {
            const target = e.target
                console.log( target );
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
        inputNombre.value = item.codigo

        nombre.append(item.nombre,inputNombre)

        const cantidad = document.createElement('td')
        const inputCantidad = document.createElement('input')
        inputCantidad.setAttribute('name','cantidad')
        inputCantidad.setAttribute('class','form-control cantidad')
        inputCantidad.value = item.cantidad
        inputCantidad.dataset.form = 'quantity'
        inputCantidad.setAttribute('min','1')
        cantidad.append(inputCantidad)

        const importe = document.createElement('td')
        importe.classList.add('text-center')
        importe.append('S/. ',item.importe)

        const action = document.createElement('td')
        action.classList.add('text-center')

        const btn = document.createElement('div')
        btn.setAttribute('class','btn btn-filling-danger')
        btn.dataset.index = item.codigo

        const icon = document.createElement('i')
        icon.setAttribute('class','fo fo-times')
        btn.append(icon)
        action.append(btn)

        tr.append(nombre,cantidad,importe,action)
        content.append(tr)
        setQuantity(inputCantidad)
    }
    totalCanaste(canasta,content)
}

const totalCanaste = (canasta,content) => {
    const tr = document.createElement('tr')
    let monto = 0
    canasta.map( item => {monto = monto + parseFloat(item.importe)} )
    
    const title = document.createElement('td')
    title.setAttribute('colspan','2')
    title.classList.add('text-right')
    title.append('Total')

    const total = document.createElement('td')
    total.setAttribute('class','text-right text-bold')
    total.append('S/. ', parseFloat(monto).toFixed(2))

    const vacio = document.createElement('td')

    tr.append(title,total,vacio)
    content.append(tr)
}