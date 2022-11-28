const express = require('express')
const routerProductos = express.Router()
const controller = require('../controller/productos')

// get all / one
routerProductos.get('/:id?', controller.getProductos)

// post
routerProductos.post('/', controller.guardarProducto)

//edit
routerProductos.put('/:id', controller.actualizarProducto)

// delete
routerProductos.delete('/:id', controller.borrarProducto)

module.exports = routerProductos