const service = require('../services/carrito')

const guardarCarrito = async (req,res)=>{
    try {
        const carrito = req.body
        const carritoGuardado = await service.guardarCarrito(carrito)
        res.status(201).json(carritoGuardado)
    } catch (error) {
        console.log('Error al guardar el carrito', error);
    }
}

module.exports = {
    guardarCarrito
}