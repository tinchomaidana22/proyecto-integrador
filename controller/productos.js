const { model } = require('mongoose')
const service = require('../services/productos')

const getProductos = async (req,res)=>{
    try {
        let id = req.params.id

        if (id) {
            const producto = await service.obtenerProducto(id)
            return res.status(200).json(producto)
        }
        const productos = await service.obtenerProductos()
        return productos
    } catch (error) {
        console.log('Error en getProductos', error);
    }
}

const guardarProducto = async (req,res)=>{
    try {
        const producto = req.body
        const prodGuardado = await service.guardarProducto(producto)
        res.status(201).json(prodGuardado)
    } catch (error) {
        console.log('Error al guardar el producto');
    }
}

const actualizarProducto = async (req,res)=>{
    try {
        const {id} = req.params
        const producto = req.body

        const prodActualizado = await service.actualizarProducto(id, producto)
        return prodActualizado
    } catch (error) {
        console.log('Error al actualizar el producto', error);
        res.send('<h1> Error al actualizar el producto </h1>')
    }
}

const borrarProducto = async (req,res)=>{
    const id = req.params.id

    if (!id) {
        return res.status(400).json('No se ha especificado un id de producto')
    }

    const prodBorrado = await service.borrarProducto(id)
    res.status(200).json(prodBorrado)
}

module.exports = {
    getProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}