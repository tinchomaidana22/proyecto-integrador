function initAlta() {
    console.warn('initAlta()');
    const productos = [
        {nombre:"Reloj",precio:"1234",stock:'35',marca:"Seiko",categoria:'Despertador', envio:true,foto:'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png',detalles:'Analogico'},
        {nombre:"Escuadra",precio:"1234",stock:'350',marca:"Pizzini",categoria:'Utiles', envio:false,foto:'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png',detalles:'Analogico'},
        {nombre:"Globo terraqueo",precio:"12340",stock:'385',marca:"Tesla",categoria:'Geografia', envio:true,foto:'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-128.png',detalles:'Plastico'}
    ]
    const camposValidos = [false,false,false,false,false,false,false]
    
    const inputs = document.querySelectorAll('input')
    console.log(inputs);
    const form = document.querySelector('form')
    const btn = document.querySelector('button')
    
    btn.disabled=true
    
    
    //muestra o oculta mensaje
    const setCustomValidity = (mesage, index)=>{ 
        let divs = document.querySelectorAll('form div')
        divs[index].innerHTML=mesage
        divs[index].style.display = mesage ? 'block' : 'none'
    }
    
    //comprobar validez campos
    const algunCampoValido = () =>{
        let valido = 
            camposValidos[0]&&
            camposValidos[1]&&
            camposValidos[2]&&
            camposValidos[3]&&
            camposValidos[4]&&
            camposValidos[5]&&
            camposValidos[6]
    
        return !valido
    }
    
    
    //validacion de campos
    const validar = (valor, validador, index)=>{
        if(!validador.test(valor)){
            setCustomValidity('Este campo no es valido', index)
            camposValidos[index] = false
            btn.disabled=true
            return null
        }
    
        camposValidos[index]=true
        btn.disabled = algunCampoValido()
    
        setCustomValidity('', index)
        return valor
    }
    
    //todas las exp regulares
    const regExpvalidar = [
        /^.+$/,//nombre
        /^.+$/,//precio
        /^[0-9]+$/, //stock
        /^.+$/,//marca
        /^.+$/,//categoria
        /^.+$/,//detalles
        /^.+$/,//foto
    
    ]
    
    inputs.forEach((input, index)=>{
        console.log(input);
        input.addEventListener('input', ()=>{
            validar(input.value, regExpvalidar[index], index) 
        })
    })
    
    form.addEventListener('submit', (e)=>{
        e.preventDefault()
    
        const producto = {
            nombre:inputs[0].value,
            precio:inputs[1].value,
            stock:inputs[2].value,
            marca:inputs[3].value,
            categoria:inputs[4].value,
            detalles:inputs[5].value,
            foto:inputs[6].value,
            envio:inputs[7].checked
        }
    
        //borrar los inputs
        inputs.forEach(input=>input.value='')
    
        productos.push(producto)
    
        btn.disabled=true
    
        
        renderProds()
    })
    
    const renderProds=()=>{
        const xhr = new XMLHttpRequest()
    
        xhr.open('get', 'plantillas/listado.hbs')
        xhr.addEventListener('load', ()=>{
            if (xhr.status===200) {
                let plantillaHbs=xhr.response
    
                let template = Handlebars.compile(plantillaHbs)
    
                let html = template({productos: productos})
    
                document.getElementById('listado-productos').innerHTML=html
            }
        })
        xhr.send()
    
    }
    renderProds()
}

initAlta()



