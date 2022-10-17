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
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
            elemSectionCarrito.innerHTML= `<h2>Enviando carrito...</h2>`
            await carritoService.guardarCarritoService(this.carrito)
            this.carrito=[]
            localStorage.setItem('carrito', this.carrito)
            elemSectionCarrito.innerHTML=`<h2>Enviando carrito <b>OK!</b> </h2>`
        } catch (error) {
            console.error(error);
        }
    }
}

const carritoController = new CarritoController()