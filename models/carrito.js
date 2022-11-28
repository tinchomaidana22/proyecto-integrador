const CarritoModelMongoDB = require('./carritoMongoDB')

class CarritoModel{
    static get(tipo){
        switch (tipo) {
            case 'MONGODB':
                console.log('persistencia en MONGODB (carrito)')
                return new CarritoModelMongoDB()
        
            default:
                console.log('persistencia en MONGODB (carrito)')
                return new CarritoModelMongoDB()
        }
    }
}

module.exports = CarritoModel