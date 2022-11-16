async function renderPlantillaListado(listado){

    try {
        const respuesta = await fetch('templates/inicio.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)

        const html = template({listado})

        document.getElementsByClassName('cards-container')[0].innerHTML=html
    } catch (error) {
        console.error(error);
    }

}

function agregarCarrito(e,id,ref){
    e.preventDefault()

    const producto = productoController.productos.find(producto=>producto.id==id)
    carritoController.agregarAlCarrito(producto)
}

async function initInicio(){
    console.warn('InitInicio');

    carritoController.notificador.classList.add('search-bar__carrito-container--notificador')
    carritoController.containerCarrito.appendChild(carritoController.notificador)
    carritoController.notificador.innerHTML = carritoController.getCantidadProductos()

    const productos = await productoController.obtenerProductos()

    await renderPlantillaListado(productos)

    const cards = document.querySelectorAll('.card')
    cards.forEach(card=>{
        card.removeAttribute('href')
    })

    document.querySelector('.section-cards__header p').innerHTML= `Se encontraron ${productos.length} productos`
}