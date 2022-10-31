class FormularioContacto{
    inputs = null
    form = null
    camposValidos=[false,false,false,false,false]
    regExpValidar = [
        /^.+$/,//nombre
        /^.+$/,//apellido
        /^.+$/,//mail
        /^[0-9]+$/, //telefono
        /^.+$/,//consulta
    ]

    constructor(enviarConsulta){
        this.inputs = document.querySelectorAll('.form__contacto .input')
        this.form = document.getElementsByClassName('form__contacto')[0]

        this.inputs.forEach((input,index)=>{
            input.addEventListener('input',()=>{
                this.validar(input.value, this.regExpValidar[index], index)
            })
        })

        this.form.addEventListener('submit', e=>{
            e.preventDefault()

            const consulta = this.leerConsulta()
            this.cleanForm()

            if(enviarConsulta) enviarConsulta(consulta) //TODO: revisar el envio
        })

        
    }

    //comprobar validez campos
    algunCampoValido = () =>{
        let valido = 
            this.camposValidos[0]&&
            this.camposValidos[1]&&
            this.camposValidos[2]&&
            this.camposValidos[3]&&
            this.camposValidos[4]
    
        return !valido
    }

    //validacion de campos
    validar = (valor, validador, index)=>{
        if(!validador.test(valor)){
            this.setCustomValidity('Este campo no es valido', index)
            this.camposValidos[index] = false
            return null
        }
    
        this.camposValidos[index]=true
        this.setCustomValidity('', index)
        return valor
    }

    //muestra o oculta mensaje
    setCustomValidity = (mesage, index)=>{ 
    let divs = document.querySelectorAll('.form__contacto div')
    divs[index].innerHTML=mesage
    divs[index].style.display = mesage ? 'block' : 'none'
    }

    leerConsulta() {
        return {
            nombre:this.inputs[0].value,
            apellido:this.inputs[1].value,
            email:this.inputs[2].value,
            celular:this.inputs[3].value,
            consulta:this.inputs[4].value,
        }
    }
    
    cleanForm = () =>{
        this.inputs.forEach((input)=>{
            input.value = ''
        })
    
        this.camposValidos = [false,false,false,false,false]
    }
}


let fContacto;

function initContacto() {
    console.warn('initContacto()');

    fContacto = new FormularioContacto(contactoController.enviarConsulta)
    //renderForm()
}