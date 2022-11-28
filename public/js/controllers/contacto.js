class ContactoController{

    async enviarConsulta(consulta){
        try {

            const btnEnvioConsulta = document.querySelector('#enviar-contacto')
            btnEnvioConsulta.textContent='Enviando Consulta...'
            
            const consultaEnviada = await contactoService.enviarConsulta(consulta)

            btnEnvioConsulta.textContent='Consulta enviada con exito!'
            setTimeout(()=>{location.reload()},1700)
            return consultaEnviada
            
        } catch (error) {
            console.error(error);
        }
    }
}

const contactoController = new ContactoController()