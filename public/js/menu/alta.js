class FormularioAlta{
    inputs = null
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false]
    regExpValidar = [
      /^.+$/, // regexp nombre
      /^.+$/, // regexp precio
      /^[0-9]+$/, // regexp stock
      /^.+$/, // regexp marca
      /^.+$/, // regexp categoria
      /^.+$/, // regexp detalles
    ]
  
    /* --------------------------- drag and drop --------------------------- */
    imagenSubida = ''
    dropArea = null
    progressBar = null
    /* --------------------------- drag and drop --------------------------- */

    constructor(renderTablaAlta, guardarProducto){ 
        this.inputs = document.querySelectorAll('main form input')
        this.form = document.querySelector('main form')
        this.btn = document.querySelector('main form button')

        this.btn.disabled=true

        this.inputs.forEach((input,index) => {
            if(input.type != 'checkbox') {
                input.addEventListener('input', () => {
                    this.validar(input.value, this.regExpValidar[index], index)
                    if(renderTablaAlta) renderTablaAlta(!this.algunCampoValido(), productoController.productos)
                })
            }
        })

        this.form.addEventListener('submit', (e)=>{
            e.preventDefault()

            const producto = this.leerProdIngresado()
            this.cleanForm()

            if(guardarProducto) guardarProducto(producto)
    
        })
    
        productoController.obtenerProductos()

        // <drag and drop>
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')

        //cancelar el drag and drop por default

        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event=>{
            this.dropArea.addEventListener(event,e=> e.preventDefault())
            document.body.addEventListener(event,e=> e.preventDefault())
        })

        // remarcar el area
        ;['dragenter', 'dragover'].forEach(event=>{
            this.dropArea.addEventListener(event,()=>{
                this.dropArea.classList.add('highlight')
            })
        })

        ;['dragleave', 'drop'].forEach(event=>{
            this.dropArea.addEventListener(event,()=>{
                this.dropArea.classList.remove('highlight')
            })
        })

        this.dropArea.addEventListener('drop', e =>{
            const dataTransfer = e.dataTransfer
            const files = dataTransfer.files

            this.handleFiles(files)
        })
        // </drag and drop>
        
    }

    //comprobar validez campos
    algunCampoValido = () =>{
        let valido = 
            this.camposValidos[0]&&
            this.camposValidos[1]&&
            this.camposValidos[2]&&
            this.camposValidos[3]&&
            this.camposValidos[4]&&
            this.camposValidos[5]
    
        return !valido
    }

    //validacion de campos
    validar = (valor, validador, index)=>{
        if(!validador.test(valor)){
            this.setCustomValidity('Este campo no es valido', index)
            this.camposValidos[index] = false
            this.btn.disabled=true
            return null
        }
    
        this.camposValidos[index]=true
        this.btn.disabled = this.algunCampoValido()
    
        this.setCustomValidity('', index)
        return valor
    }

    //muestra o oculta mensaje
    setCustomValidity = (mesage, index)=>{ 
    let divs = document.querySelectorAll('form div div')
    divs[index].innerHTML=mesage
    divs[index].style.display = mesage ? 'block' : 'none'
    }

    leerProdIngresado() {
        return {
            nombre:this.inputs[0].value,
            precio:this.inputs[1].value,
            stock:this.inputs[2].value,
            marca:this.inputs[3].value,
            categoria:this.inputs[4].value,
            detalles:this.inputs[5].value,
            envio:this.inputs[7].checked
        }
    }
    
    cleanForm = () =>{
        this.inputs.forEach((input)=>{
            if (input.type != 'checkbox') input.value = ''
            else if (input.type==='checkbox') input.checked=false
        })
    
        this.btn.disabled=true
        this.camposValidos = [false,false,false,false,false,false]
    }

    // <drag and drop>
    initializeProgress(){
        this.progressBar.value = 0
    }

    updateProgress(porcentaje){
        this.progressBar.value = porcentaje
    }

    previewFile(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = ()=>{
            const img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }

    handleFiles(files){
        const file = files[0]
        this.initializeProgress()
        this.uploadFile(file)
        this.previewFile(file)
    }
    
    uploadFile(file){
        const url = '/api/upload'

        const xhr = new XMLHttpRequest()
        const formData = new FormData()

        xhr.open('POST', url)

        xhr.upload.addEventListener('progress', e=>{
            let porcentaje = (((e.loaded*100)/e.total)||100)
            this.updateProgress(porcentaje)
        })

        xhr.addEventListener('load', ()=>{
            if (xhr.status===200) {
                const objImg = JSON.parse(xhr.response)
                this.imagenSubida = objImg.nombre
            }
        })

        formData.append('foto', file)
        xhr.send(formData)
    }
    // </drag and drop>
}

/* FUNCTIONS AND GLOBAL VARIABLES DECLARATIONS */

const renderTablaAlta=(validos, productos)=>{ 
    const xhr = new XMLHttpRequest()

    xhr.open('get', 'templates/alta.hbs')
    xhr.addEventListener('load', ()=>{
        if (xhr.status===200) {
            let plantillaHbs=xhr.response

            let template = Handlebars.compile(plantillaHbs)

            let html = template({productos, validos})

            document.getElementById('listado-productos').innerHTML=html
        }
    })
    xhr.send()

}

let formularioAlta = null

async function initAlta(){
    console.warn('InitAlta');

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    const productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
}









