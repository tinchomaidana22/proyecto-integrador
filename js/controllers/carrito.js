class CarritoController extends CarritoModel {

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

    obtenerProductoCarrito(producto){
        return this.carrito.find(prod=>prod.id==producto.id)
    }

    agregarAlCarrito(producto){

        if(!this.productoEnCarrito(producto)){
            producto.cantidad=1
            this.carrito.push(producto)
        } else{
            const productoCarrito = this.obtenerProductoCarrito(producto)
            productoCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }

    async descontarDelCarrito(id){
        try {
            const index = this.carrito.findIndex(prod=>prod.id==id)
            this.carrito[index].cantidad--
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)

            if (this.carrito[index].cantidad === 0) {
                this.borrarDelCarrito(id)
            }
        } catch (error) {
            console.log('Erro restar cantidad', error);
        }
    }

    async sumarDelCarrito(id){
        try {
            const index = this.carrito.findIndex(prod=>prod.id==id)
            this.carrito[index].cantidad++
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.log('Erro sumar cantidad', error);
        }
    }

    async borrarDelCarrito(id){
        try {
            const index = this.carrito.findIndex(prod=>prod.id==id)
            this.carrito.splice(index,1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
            await renderTablaCarrito(this.carrito)
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

    
}

const carritoController = new CarritoController()