function initCard() {
    console.warn('initCard()');
    function Card(heading, description, image) {
        this.heading=heading
        this.description=description
        this.image=image
    
        this.appendTo = function(destinationElement){
            let card=document.createElement('a')
            card.classList.add('card')
            card.href='https://sony.com'
    
            let that = this
    
            card.addEventListener('click', (e)=>{
                e.preventDefault()
                console.log(this);
    
                let nuevoItemCarrito = document.createElement('div')
                nuevoItemCarrito.classList.add('carrito__item')
                nuevoItemCarrito.innerHTML=that.heading
                console.log(nuevoItemCarrito);
    
                elemSectionCarrito.append(nuevoItemCarrito)
            })
    
            card.innerHTML= `
            <article class="card__article">
                <div class="card__image-container">
                    <img class="card__image" src=${image} alt=${heading}/>
                </div>
                <div class="card__content">
                    <h2 class="card__heading">${heading}</h2>
                    <div class="card__description">
                        <p>${description}</p>
                    </div>
                </div>
            </article>
            `
    
            destinationElement.appendChild(card)
        }
    
    }
    
    const cardsContainer = document.getElementsByClassName('cards-container')[0]
    
    
    const card1 = new Card('Acelga en hojas', 'Acelga en hojas congeladas','img/productos/vegetales/acelga-en-hojas-cortadas.jpg')
    const card2 = new Card('Arveja', 'Arveja congelada', 'img/productos/vegetales/arveja.jpg')
    const card3 = new Card('Batata', 'Batata en cubos congelada', 'img/productos/vegetales/batata-en-cubos.jpeg')
    const card4 = new Card('Brocoli', 'Brocoli congelado', 'img/productos/vegetales/brocoli.jpg')
    const card5 = new Card('Cebolla', 'Cebolla cortada en cubos congelada', 'img/productos/vegetales/cebolla-en-cubos.jpg')
    const card6 = new Card('Champignones', 'Champignones fletados congelados', 'img/productos/vegetales/champignones.jpg')
    const card7 = new Card('Ananá', 'Ananá cortado en cubos congelao', 'img/productos/frutas/anana.jpg')
    const card8 = new Card('Arándanos', 'Arándanos congelados', 'img/productos/frutas/arandanos.jpg')
    const card9 = new Card('Durazno', 'Durazno cortado en cubos congelado', 'img/productos/frutas/durazno.jpg')
    const card10 = new Card('Frambuesas', 'Frambuesas congeladas', 'img/productos/frutas/frambuesa.jpg')
    const card11 = new Card('Frutillas', 'Frutillas congeladas', 'img/productos/frutas/frutilla.jpg')
    const card12 = new Card('Mango', 'Mango cortado en cubos congelado', 'img/productos/frutas/mango.jpg')
    
    console.log(card1);
    
    const cards = [
        card1,
        card2,
        card3,
        card4,
        card5,
        card6,
        card7,
        card8,
        card9
    ]
    
    cards.forEach(card=>{
        card.appendTo(cardsContainer)
    })
}