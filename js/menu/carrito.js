async function renderTablaCarrito(carrito) {

    try {
        const respuesta = await fetch('templates/carrito.hbs')
        const plantillaHbs = await respuesta.text()
        const template = Handlebars.compile(plantillaHbs)
        const html = template({carrito})
        document.querySelector('.contenedor-carrito').innerHTML = html
    } catch (error) {
        console.error('error cargado carrito', error)
    }

        
}


function initCarrito() {
    console.warn('initCarrito()');
    const btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

    
    btnCarrito.addEventListener('click', async (e)=>{
        location.hash = '#carrito'
        await renderTablaCarrito(carritoController.carrito)
    })  
}

initCarrito()

