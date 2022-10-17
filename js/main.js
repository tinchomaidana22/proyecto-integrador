//var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0] // TODO: revisar

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
        return `vistas/${id}.html`
    }

    marcarLink(id) {
        const links = document.querySelectorAll('header nav a')

        links.forEach(link =>{
            if (link.id===id) link.classList.add('active')
            else link.classList.remove('active')    
            
        })
    }

    initJS(id) { // usar switch mejor
        if (id === 'alta') {
            initAlta()
        } else if (id === 'inicio'){
            initInicio()
        } else if (id==='nosotros'){
            initNosotros()
        } else if (id==='contacto'){
            initContacto()
        }
    }

    async cargarPlantilla(id) {
        let archivo = this.getFileName(id)

        let plantilla = await this.ajax(archivo)
        
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