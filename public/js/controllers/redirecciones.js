class Redirecciones {

    enviarAInicio(){
        if(location.hash != '#inicio') location.hash = '#inicio'
        else carritoController.cerrarCarrito()
        
        carritoController.cerrarCarrito()
    }

    enviarAContacto(){
        location.hash = '#contacto'
    }
}

const redirecciones = new Redirecciones()