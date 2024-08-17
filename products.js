
const products = [
    {
        name: 'Smash',
        ingredients: 'Pão de fermentação natural da trigou, burguer 160g, queijo prato e maionese da casa',
        price: 19.90,
        image: '/assets/hamb-1.png',
        category: 'hamburguer'
    },
    {
        name: 'Duplo Burguer',
        ingredients: 'Pão de fermentação natural da trigou, burguer 160g, queijo prato e maionese da casa',
        price: 29.90,
        image: '/assets/hamb-2.png',
        category: 'hamburguer'
    },
    {
        name: 'Duplo Cheddar',
        ingredients: 'Pão de fermentação natural da trigou, burguer 160g, queijo prato e maionese da casa',
        price: 25.90,
        image: '/assets/hamb-3.png',
        category: 'hamburguer'
    },
    {
        name: 'Chicken',
        ingredients: 'Pão de fermentação natural da trigou, burguer 160g, queijo prato e maionese da casa',
        price: 35.90,
        image: '/assets/hamb-4.png',
        category: 'hamburguer'
    },
    {
        name: 'Guaraná Antarctica',
        price: 5.00,
        image: '/assets/refri-2.png',
        category: 'bebida'
    },
    {
        name: 'Coca-cola',
        price: 5.00,
        image: '/assets/refri-1.png',
        category: 'bebida'
    },
    {
        name: 'Torta com Ganache Preto',
        ingredients: 'Biscoito de chocolate, chocolate 50%, creme de leite, café solúvel, chocolate branco',
        price: 15.00,
        image: '/assets/torta-1.jpg',
        category: 'sobremesa'
    },
    {
        name: 'Cookies com gotas de chocolate',
        ingredients: 'Manteiga, açúcar mascavo, essência de baunilha, gotas de chocolate ao leite',
        price: 15.00,
        image: '/assets/cook-1.jpg',
        category: 'sobremesa'
    }
]

const menuBody = document.getElementById('menu-body')


// Função para mostrar o produto com base na categoria
function showProducts(category = 'hamburguer') {

    const productsFilter = products.filter(product => product.category === category)

    menuBody.innerHTML = ''

    productsFilter.forEach(products => {
        const containMenu = document.createElement('div')

        containMenu.innerHTML = `
                <div class='flex gap-3'>
                    <img class="w-28 h-28 rounded-md hover:scale-110 hover:-rotate-3 duration-200" src="${products.image}"/>
        
                    <div class='w-full '>
                        <p class="font-bold">${products.name}</p>
                        <p class="text-sm">Ingredientes: ${products.ingredients}</p>
        
                        <div class='flex gap-2 justify-between mt-3'>
                            <p class="font-bold text-lg">R$ ${products.price}</p>
                            <button class="bg-gray-900 px-5 rounded add-to-cart-btn">
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







