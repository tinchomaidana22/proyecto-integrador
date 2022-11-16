class CarritoController extends CarritoModel {

    containerCarrito = document.querySelector('.search-bar__carrito-container')
    notificador = document.createElement('div')
    totales = document.getElementsByClassName('totales')

    constructor(){
        super()
        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
        } catch (error) {

            this.carrito=[]
            localStorage.setItem('carrito', this.carrito)

            console.error(error);
        }
    }

    productoEnCarrito(producto){

        const productos = this.carrito.filter(prods=>prods.id==producto.id).length

        return productos

    }

    setValores(){
        this.notificador.innerHTML = this.getCantidadProductos()
        this.totales[0].innerHTML = `Total productos: ${this.getCantidadProductos()}`
        this.totales[1].innerHTML = `Precio total: $${this.getValorCarrito()}`
    }

    totalesEnCarrito(){
        setTimeout(()=>{
            this.totales[0].innerHTML = `Cargando...`
            this.totales[1].innerHTML = `Cargando...`
            this.totales[0].innerHTML = `Total productos: ${this.getCantidadProductos()}`
            this.totales[1].innerHTML = `Precio total: $${this.getValorCarrito()}`
        },1000)
    }
    

    obtenerProductoCarrito(producto){
        return this.carrito.find(prod=>prod.id==producto.id)
    }

    agregarAlCarrito(producto){

        if(!this.productoEnCarrito(producto)){
            producto.cantidad=1
            producto.precioTotal;
            producto.precioTotal = producto.precio * producto.cantidad
            this.carrito.push(producto)
            
            this.notificador.innerHTML = this.getCantidadProductos()
            
        } else{
            const productoCarrito = this.obtenerProductoCarrito(producto)
            productoCarrito.cantidad++
            producto.precioTotal = producto.precio * producto.cantidad
            this.notificador.innerHTML = this.getCantidadProductos()
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))

        
    }

    async descontarDelCarrito(id){
        try {
            const index = this.carrito.findIndex(prod=>prod.id==id)
            this.carrito[index].cantidad--
            this.carrito[index].precioTotal = this.carrito[index].cantidad * this.carrito[index].precio

            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
            
            this.setValores()

            if (this.carrito[index].cantidad === 0) {

                this.borrarDelCarrito(id)

                this.setValores()
            }
        } catch (error) {
            console.log('Error restar cantidad', error);
        }
    }

    async sumarDelCarrito(id){
        try {
            const index = this.carrito.findIndex(prod=>prod.id==id)
            this.carrito[index].cantidad++
            this.carrito[index].precioTotal = this.carrito[index].cantidad * this.carrito[index].precio

            
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)


            this.setValores()
        } catch (error) {
            console.log('Error sumar cantidad', error);
        }
    }

    async borrarDelCarrito(id){
        try {
            const index = this.carrito.findIndex(prod=>prod.id==id)
            this.carrito.splice(index,1)

            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            await renderTablaCarrito(this.carrito)
            this.setValores()
            
        } catch (error) {
            console.log(error);  
        }
    }

    async enviarCarrito(){
        try {
            const btnEnvioCarrito = document.querySelector('#enviar-carrito')
            btnEnvioCarrito.textContent = 'Enviando carrito...'
            await carritoService.guardarCarritoService(this.carrito)

            this.carrito=[]
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            btnEnvioCarrito.textContent = 'Carrito enviado con exito!'
            setTimeout(()=>{location.reload()},1200)
            
        } catch (error) {
            console.error(error);
        }
    }

    cerrarCarrito(){
        const carrito = document.getElementsByClassName('section-carrito--visible')[0]
        if (carrito.className.includes('--visible')) carrito.classList.remove('section-carrito--visible')
    }

    getCantidadProductos(){
        const cantidades = this.carrito.map(prod=>{
            return prod.cantidad
        })

        const totalProductos = cantidades.reduce(
            (previo, actual) => previo + actual,
            0
        );

        
        
        return totalProductos
    }


    getValorCarrito(){
        const precios = this.carrito.map(prod=>{
            const precios = parseInt(prod.precio)
            const preciosTotal = precios * prod.cantidad
            return preciosTotal
        })

        const totalPrecios = precios.reduce(
            (previo, actual) => previo + actual,
            0
        );

        return totalPrecios
    }

}

const carritoController = new CarritoController()