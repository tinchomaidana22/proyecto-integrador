const mongoose = require('mongoose')

// <esquema>
const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    cateogria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})
// </esquema>

//<modelo>
const ProductoModel = mongoose.model('productos', productoSchema)
//</modelo>

//<conexion a DB>
class ProductoModelMongoDB{
    async conectarDB(){
        try {
            await mongoose.connect(process.env.URI_MONGO_LOCAL || process.env.URI_MONGO_REMOTA)
            console.log('Base de datos conectada correctamente!');
        } catch (error) {
            console.log('Error en la conexion a MONGODB', error);
        }
    }

    async createProducto(producto){
        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()
            return productoSave
        } catch (error) {
            console.log('Error al guardar producto', error);
        }
    }

    async readProductos(){
        try {
            const productos = await ProductoModel.find({})
            return productos
        } catch (error) {
            console.log('Error al leer los productos', error);
        }
    }

    async readProducto(id){
        try {
            const producto = new ProductoModel.findById(id)
            return producto
        } catch (error) {
            console.log('error al leer el producto', error);
        }
    }

    async updateProducto(id, producto){
        try {
            const resultado = await ProductoModel.updateOne({_id:id}, {$set: producto})
            const productoActualizado = await ProductoModel.findById(id)

            return {resultado, productoActualizado}
        } catch (error) {
            console.log('Error al actualizar el producto', error);
        }
    }

    async deleteProducto(id){
        try {
            await ProductoModel.findByIdAndDelete(id)
            return 'Producto eliminado'
        } catch (error) {
            console.log('Error al eliminar el producto', error);
        }
    }
}
//</conexion a DB>

module.exports = ProductoModelMongoDB