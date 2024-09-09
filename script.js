
const menu = document.getElementById("menu")
const menuBody = document.getElementById('menu-body')
const viewModal = document.getElementById('view-modal')
const modalProduct = document.getElementById('modal-product')
const cartModal = document.getElementById("cart-modal")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const adressInput = document.getElementById("adress")
const adressWarn = document.getElementById("adress-warn")
const closeModalBtn = document.getElementById("close-modal-btn")
const btnCheckout = document.getElementById("checkout-btn")
const cartBtn = document.getElementById("cart-btn")
const cartCount = document.getElementById("cart-count")

let cart = []

//Abrir o Modal do carrinho
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex"
})

//Fechar Modal do carrinho ao clicar fora dele
cartModal.addEventListener("click", (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

//Fechar Modal no botão de fechar
closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none"
})

// Função para mostrar o produto com base na categoria
function showProducts(category = 'hamburguer') {

    const productsFilter = products.filter(product => product.category === category)

    menuBody.innerHTML = ''

    productsFilter.forEach(products => {
        const containMenu = document.createElement('div')

        containMenu.innerHTML = `
                <div class='flex gap-3 p-2 transition-all duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-xl hover:bg-white rounded-lg add-modal-product' data-product-id="${products.id}">
                    <img class="w-28 h-28 rounded-md" src="${products.image}"/>
        
                    <div class='w-full '>
                        <p class="font-bold">${products.name}</p>
                        <p class="text-sm">Ingredientes: ${products.ingredients}</p>
        
                        <div class='flex gap-2 justify-between mt-3'>
                            <p class="font-bold text-lg">R$ ${products.price}</p>
                            <button class="bg-gray-900 px-5 rounded add-to-cart-btn" data-product-id="${products.id}">
                                <i class="fa fa-cart-plus text-lg text-white"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `

        menuBody.appendChild(containMenu)
    })

}
showProducts()

// Botões de categorias
document.getElementById('btn-category--hamburguer').addEventListener('click', () => showProducts('hamburguer'))
document.getElementById('btn-category--bebida').addEventListener('click', () => showProducts('bebida'))
document.getElementById('btn-category--sobremesa').addEventListener('click', () => showProducts('sobremesa'))

menu.addEventListener("click", (event) => {
    //console.log(event.target) //Identificar qual elemento foi clicado no menu

    let modalProductView = event.target.closest(".add-modal-product")

    if (modalProductView) {
        const productId = parseInt(modalProductView.getAttribute("data-product-id"))
        const productItem = products.find(product => product.id === productId)

        addModalProduct(productItem)
        
    }






    let parentButton = event.target.closest(".add-to-cart-btn")
    //console.log(parentButton)

    if (parentButton) {
        const productId = parseInt(parentButton.getAttribute("data-product-id"))
        const productData = products.find(product => product.id === productId)

        let name = productData.name
        let price = productData.price
        let ingredients = productData.ingredients
        let img = productData.image


        addToCart(name, price, ingredients, img)

    }
})

// Adicionar item no modal de visualização 
function addModalProduct(productItem) {
    
    const productElement = document.createElement("div")
    

    productElement.innerHTML = `
        <div class="flex">
            
            <div class='flex-1'>
                <img src="assets/hamb-8.png" class='rounded-md'>
            </div>
            
            
            <div class='pl-3 flex flex-col flex-1'>
                <div class='flex flex-col'>
                    <span class='font-bold border-b border-gray-200 pb-2'>Nome do Produto</span>
                    <span class='border-b border-gray-200 py-2'>Ingredientes do produto</span>
                </div>
                <div class='py-3 flex-grow'>
                    <span class='font-bold'>Adicionais</span>
                </div>
                <div class='mt-auto text-center border-t border-gray-200 pt-4'>
                    <span class='block'>Valor do produto</span>
                </div>
            </div>
        </div> 
    `

    modalProduct.appendChild(productElement)
}
addModalProduct()

//Adicionar itens no carrinho
function addToCart(name, price, ingredients, img) {
    //verificar se o item já existe no carrinho
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        //caso exista vamos alterar apenas a quantidade
        existingItem.quantity += 1

    } else {

        cart.push({
            name,
            price,
            ingredients,
            quantity: 1
        })

    }

    updateCart()

}

//Atualiza as informações no carrinho
function updateCart() {
    cartItems.innerHTML = ""
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        // Adicionando informações dos itens selecionados no carrinho
        cartItemElement.innerHTML = `   
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                
                <button class="remove-cart-btn border-2 rounded-md px-2 py-1" data-name="${item.name}">
                    Remover
                </button>
            </div>        

        `

        total += item.price * item.quantity //Primeiro Multiplicamos o valor pela quantidade de itens e somamos ao total

        cartItems.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCount.innerHTML = cart.length
}

//Função para remover item do carrinho
cartItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-cart-btn")) {  //Verificando se no item clicado existe a classe referenciada, neste caso nosso modal
        const name = event.target.getAttribute("data-name") //Pegando o atributo data dentro do item

        removeItemCart(name)
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name)//verificando se encontra o index correspondente ao name na nossa lista.

    if (index != -1) {
        const item = cart[index] //caso retorne index, vamos buscar o item na lista 

        if (item.quantity > 1) { //caso tenha a quantidade do item seja maior que um, removemos 1 
            item.quantity -= 1

            updateCart()
            return
        }

        cart.splice(index, 1)//caso tenha só um item, removemos o item da lista 
        updateCart()
    }
}


//Função de verificação do input de endereço 
adressInput.addEventListener('input', (event) => {
    let inputValue = event.target.value

    if (inputValue !== '') {
        adressInput.classList.remove('border-red-500')
        adressWarn.classList.add('hidden')
    }
})

//Finalizar o pedido
btnCheckout.addEventListener('click', () => {
    const isOpen = checkRestaurantOpen()
    if (!isOpen) {
        Toastify({
            text: "Ops o restaurante está fechado!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        return
    }

    if (cart.length === 0) return

    if (adressInput.value === '') {
        adressWarn.classList.remove('hidden')
        adressInput.classList.add('border-red-500')
        return
    }

    //Após todas verificações, enviar o pedido para API whats
    const cartItems = cart.map((items) => {
        return (
            `${items.name} Quantidade:(${items.quantity}) Preço:R$${items.price} |`
        )
    }).join('')

    const message = encodeURIComponent(cartItems)
    const phone = '17992394982'

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${adressInput.value}`, '_blank')

    cart = []
    updateCart()
})

//Verificar a hora para manipular o horário e informar se o restaurante está aberto ou fechado
function checkRestaurantOpen() {
    const data = new Date()
    const hora = data.getHours()
    return hora >= 18 && hora < 23
}

const spanItem = document.getElementById('date-span')
const isOpen = checkRestaurantOpen()

if (isOpen) {
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-600')
} else {
    spanItem.classList.remove('bg-green-600')
    spanItem.classList.add('bg-red-500')

}