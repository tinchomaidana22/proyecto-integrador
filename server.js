//<configuraciones>
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const routerCarrito = require('./routes/carrito')
const routerProductos = require('./routes/productos')
const routerUpload = require('./routes/upload')
//</configuraciones>

//<middleware>
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//</middleware>

//<routes>
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/api/upload', routerUpload)
//</routes>

app.get('/',(req,res)=>{
    res.json('todo piola')
})

app.listen(PORT, err=>{
    if(err) throw new Error(err)

    console.log(`Todo andando bien en el puerto ${PORT}`);
})