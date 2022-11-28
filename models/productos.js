const {model} = require('mongoose')

const ProductoModelFile = require('./productosFile')
const ProductoModelMongoDB = require('./productosMongoDB')

class ProductoModel{
    static get(tipo){
        switch (tipo) {
            case 'MONGODB':
                console.log('Persistencia en MONGODB (productos)');
                const mongodb = new ProductoModelMongoDB()
                mongodb.conectarDB()
                return mongodb

            case 'FILE':
                console.log('Persistencia en FILE');
                const file = new ProductoModelFile()
                return file
        
            default:
                console.log('No se especifico ningun tipo');
                break;
        }
    }
}

module.exports = ProductoModel