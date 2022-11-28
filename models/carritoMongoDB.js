const mongoose = require('mongoose')

//<schema>
const carritoSchema = mongoose.Schema({
    carrito: Array
})
//<schema>

//<Modelo almacenado>
const CarritoModel = mongoose.model('carritos', carritoSchema)
//<Modelo almacenado>

class CarritoModelMongoDB{
    async createCarrito(carrito){
        try {
            const carritoSave = new CarritoModel({carrito})
            await carritoSave.save()
            return carrito
        } catch (error) {
            console.log('Error en la creacion del carrito', error);
            return {}
        }
    }
}

module.exports = CarritoModelMongoDB