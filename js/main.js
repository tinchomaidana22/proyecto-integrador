class Main {
    // helper ajax
    async ajax(url,metodo='get') {

        try {
            const respuesta = await fetch(url,{method:metodo} )
            const resultado = await respuesta.text()
            return resultado
        } catch (error) {
            console.error(error);
        }
        
    }

    // helper obtener nombre archivo
    getFileName(id) {
        return `views/${id}.html`
    }

    marcarLink(id) {
        const links = document.querySelectorAll('header nav a')

        links.forEach(link =>{
            if (link.id===id) link.classList.add('active')
            else link.classList.remove('active')    
            
        })
    }

    initJS(id) { 

        switch (id) {
            case 'alta':
                initAlta()
                break;
            case 'inicio': 
                initInicio()
                break;
            case 'nosotros': 
                initNosotros()
                break;
            case 'contacto': 
                initContacto()
                break;
            case 'carrito': 
                initCarrito()    
        }

    }

    async cargarPlantilla(id) {
        let archivo = this.getFileName(id)
        console.log(archivo);

        let plantilla = await this.ajax(archivo)
        console.log(plantilla);
        
        //carga del codigo de la plantilla
        let main = document.querySelector('main')
        main.innerHTML=plantilla

        //carga del codigo script de la plantilla
        this.initJS(id)
        
    }

    async cargarPlantillas(){
        //carga inicial de la vista determinada por la url visitada
        let id = location.hash.slice(1) || 'inicio'
        await this.cargarPlantilla(id)
        this.marcarLink(id)

        //carga de cada uno de los contenidos segun la navegacion local
        const links = document.querySelectorAll('header nav a')
        links.forEach(link => {
            link.addEventListener('click', e =>{
                e.preventDefault()

                let id = link.id
                location.hash=id
            })
        })

        window.addEventListener('hashchange', async ()=>{
            let id = location.hash.slice(1) || 'inicio'

            await this.cargarPlantilla(id)
            this.marcarLink(id)

        })
    }

    async start() {
        await this.cargarPlantillas()
    }

}

const main = new Main()
main.start()
