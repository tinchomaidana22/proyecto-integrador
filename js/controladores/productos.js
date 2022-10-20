class ProductoController extends ProductoModel{
    constructor(){
        super()
        this.guardarProducto = this.guardarProducto.bind(this)
    }

    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }
    
    async guardarProducto(producto) {
    
        const prodGuardado = await productoService.guardarProductoService(producto)
    
        this.productos.push(prodGuardado)
        renderTablaAlta(null, this.productos)
    }
    
    async actualizarProd(id) {
        const producto = formularioAlta.leerProdIngresado()
        formularioAlta.cleanForm()
    
        let prodActualizado = await productoService.actualizarProductoService(id, producto)
        const index = this.productos.findIndex(prod=>prod.id == prodActualizado.id)

        this.productos.splice(index,1,prodActualizado)

        renderTablaAlta(null, this.productos)
        }
    
    async borrarProd(id) {
        let prodBorrado = await productoService.borrarProdService(id)
    
        const index = this.productos.findIndex(prod=>prod.id==prodBorrado.id)
        
        this.productos.splice(index,1)
    
        renderTablaAlta(null, this.productos)
    }

}

const productoController = new ProductoController()