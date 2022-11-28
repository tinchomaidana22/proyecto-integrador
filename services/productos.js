const ProductoModel = require('../models/productos')

const model = ProductoModel.get(process.env.PERSISTENCIA || 'MONGODB' || 'FILE')

const obtenerProducto = async id =>{
    try {
        let producto = await model.readProducto(id)
        return producto
    } catch (error) {
        console.log('Error al obtener el producto', error);
    }
}

const obtenerProductos = async() =>{
    try {
        let productos = await model.readProductos()
        return productos
    } catch (error) {
        console.log('Error al leer el producto', error);
    }
}

const guardarProducto = async (producto)=>{
    try {
        const prodGuardado = await model.createProducto(producto)
        return prodGuardado
    } catch (error) {
        console.log('Error al guardar el producto', error);
    }
}

const borrarProducto = async id =>{
    try {
        const prodEliminado = await model.deleteProducto(id)
        return prodEliminado
    } catch (error) {
        console.log('Error al eliminar el producto', error);
    }
}

const actualizarProducto = async (id,producto)=>{
    try {
        const prodActualizado = await model.updateProducto(id,producto)
        return prodActualizado
    } catch (error) {
        console.log('Error al actualizar producto', error);
    }
}



module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    borrarProducto,
    actualizarProducto
}