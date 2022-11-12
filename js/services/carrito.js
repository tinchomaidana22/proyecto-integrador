class CarritoService{
    URL_CARRITO='https://633ccbdff2b0e623dc67cdfd.mockapi.io/carrito/'

    async guardarCarritoService(carrito){
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }
}

const carritoService = new CarritoService()