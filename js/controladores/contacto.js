class ContactoController{

    async enviarConsulta(consulta){
        try {

            const divFormConsulta = document.querySelector('#envio-consulta')
            divFormConsulta.innerHTML='Enviando Consulta'
            
            const consultaEnviada = await contactoService.enviarConsulta(consulta)

            divFormConsulta.innerHTML='Consulta Enviada con exito'
            return consultaEnviada
            
        } catch (error) {
            console.error(error);
        }
    }
}

const contactoController = new ContactoController()