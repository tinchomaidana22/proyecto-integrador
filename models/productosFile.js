const {json} = require('express')
const fs = require('fs')

class ProductoModelFile{
    nombreArchivo = 'productos.json'

    async leerArchivoProductos(){
        try {
            let productos = await JSON.parse(await fs.promises.readFile(this.nombreArchivo, 'UTF-8'))
            return productos
        } catch (error) {
            console.log('Error al leer el archivo', error);
            let productos = []
            return productos
        }
    }

    getId(productos){
        return productos.length ? (productos[productos.length - 1].id + 1) : 1
    }

    async guardarArchivoProductos(productos){
        try {
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos,null, '\t'))
        } catch (error) {
            console.log('Error en guardar archivo', error);
        }
    }

    async createProducto(producto){
        try {
            let productos = await this.leerArchivoProductos()

            producto.id = this.getId(productos)
            productos.push(producto)

            await this.guardarArchivoProductos(productos)
            return productos
        } catch (error) {
            console.log('Error en crear producto', erro);
        }
    }

    async readProductos(){
        try {
            let productos = await this.leerArchivoProductos()
            return productos
        } catch (error) {
            console.log('Error al leer los productos', error);
        }
    }

    async readProducto(id){
        try {
            const productos = await this.leerArchivoProductos()
            const producto = productos.find(prod=>prod.id===id)
            return producto
        } catch (error) {
            console.log('Error al leer el producto', error);
        }
    }

    async deleteProducto(id){
        try {
            const productos = await this.leerArchivoProductos()
            const index = productos.findIndex(prod=>prod.id===id)
            const producto = productos.splice(index, 1)[0]

            return producto
        } catch (error) {
            console.log('Error al borrar el producto', error);
        }

    }

    async updateProducto(id, producto){
        try {
            const productos = await this.leerArchivoProductos()

            producto.id = id
            const index = productos.findIndex(prod=>prod.id===id)
            productos.splice(index,1,producto)
        } catch (error) {
            console.log('Error al actualizar el producto', error);
        }
    }
}

module.exports = ProductoModelFile