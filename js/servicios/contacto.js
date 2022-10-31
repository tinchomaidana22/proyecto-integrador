class ContactoService {
    URL_CONTACTO = 'https://633ccbdff2b0e623dc67cdfd.mockapi.io/contacto'

    async enviarConsulta (consulta){
        const consultaEnviada = await http.post(this.URL_CONTACTO,consulta)
        return consultaEnviada
    }
}

const contactoService = new ContactoService()

        
