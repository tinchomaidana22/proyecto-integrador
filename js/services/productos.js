class ProductoService{
    URL_PRODUCTOS = 'https://633ccbdff2b0e623dc67cdfd.mockapi.io/productos/'

    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS)
        return productos
    }
    
    async guardarProductoService(producto){
        const prodGuardado = await http.post(this.URL_PRODUCTOS, producto)
        return prodGuardado
    }
    
    async actualizarProductoService(id, producto){
        const prodActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        return prodActualizado
    }
    
    async borrarProdService(id){
        const prodBorrado = await http.del(this.URL_PRODUCTOS, id)
        return prodBorrado
    }
}

const productoService = new ProductoService()
