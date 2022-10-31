class ContactoController extends ContactoModel{
    async enviarConsulta(consulta){
        try {
            this.contacto.push(consulta)
            const divForm = document.getElementsByClassName('.envio-consulta')[0]
            divForm.innerHTML = `<h2>Enviando consulta...</h2>`

            await contactoService.enviarConsulta(this.contacto)

            divForm.innerHTML = `<h2>Enviando consulta <b>OK!</b></h2>`
        } catch (error) {
            console.error(error)
        }
    }
}

const contactoController = new ContactoController()