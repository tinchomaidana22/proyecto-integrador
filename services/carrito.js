const CarritoModel = require('../models/carrito')
const model = CarritoModel.get(process.env.PERSISTENCIA || 'MONGODB' || 'FILE')

const guardarCarrito = async carrito =>{
    try {
        const carritoGuardado = await model.createCarrito(carrito)
        return carritoGuardado
    } catch (error) {
        console.log('Error al guardar el carrito', error);
    }
}

module.exports = guardarCarrito