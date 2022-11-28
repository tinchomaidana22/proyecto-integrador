class Http{

    //get
    async get(url, id) {
        try {
            const response = await fetch(url + (id || ''), {method: 'get'})
            const resultado = await response.json()
            return resultado
        } catch (error) {
            console.error('ERROR GET: ', error)
        }
    }

    // post
    async post(url, dato) {
        try {
            const response = await fetch(url, {method: 'post', body:JSON.stringify(dato), headers:{'content-type': 'application/json'}})
            const resultado = await response.json()
            return resultado
        } catch (error) {
            console.error('ERROR POST: ', error)
        }
    }

    // put
    async put(url, id, dato) {
        try {
            const response = await fetch(url + id, {method: 'put', body:JSON.stringify(dato), headers:{'content-type': 'application/json'}})
            const resultado = await response.json()
            return resultado
        } catch (error) {
            console.error('ERROR PUT: ', error)
        }
    }
    // delete
    async del(url, id) {
        try {
            const response = await fetch(url + id, {method: 'delete'})
            const resultado = await response.json()
            return resultado
        } catch (error) {
            console.error('ERROR DELETE: ', error)
        }
    }
}

const http = new Http()

