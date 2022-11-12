class Redirecciones {

    enviarAInicio(){
        location.hash = '#inicio'
        carritoController.cerrarCarrito()
    }

    enviarAContacto(){
        location.hash = '#contacto'
    }
}

const redirecciones = new Redirecciones()