class CarritoService{
    URL_CARRITO='https://633ccbdff2b0e623dc67cdfd.mockapi.io/carrito/'

    async guardarCarritoServicio(carrito){
        const carritoGuardado = await http.post()
        return carritoGuardado
    }
}

const carritoService = new CarritoService()