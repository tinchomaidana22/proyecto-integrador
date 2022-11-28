const express = require('express')
const controller = require('../controller/carrito')
const routerCarrito = express.Router()

// post para agregar producto al carrito
routerCarrito.post('/', controller.guardarCarrito)

module.exports = routerCarrito