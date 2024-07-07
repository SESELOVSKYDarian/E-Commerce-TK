document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la animación de carga
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.classList.remove('hidden');

    // Ocultar la animación de carga después de 3 segundos
    setTimeout(() => {
        loadingContainer.classList.add('hidden');
    }, 3000);
});

document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.btn-buy');
    cartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    function addToCart(event) {
        const button = event.target;
        const productId = button.getAttribute('data-product-id');
        const productTitle = button.getAttribute('data-product-title');
        const productPrice = parseFloat(button.getAttribute('data-product-price'));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            cart[productIndex].quantity += 1;
        } else {
            const newProduct = {
                id: productId,
                title: productTitle,
                price: productPrice,
                quantity: 1
            };
            cart.push(newProduct);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Actualizar el icono del carrito después de añadir un producto
        updateCartIcon();
    }

    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartIconText = document.querySelector('.cart-icon-text');

        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });

        if (totalItems > 0) {
            cartIconText.textContent = totalItems;
            cartIconText.style.display = 'inline-block';
        } else {
            cartIconText.style.display = 'none';
        }
    }

    // Llamar a updateCartIcon cuando la página carga para establecer el estado inicial del icono del carrito
    updateCartIcon();
});

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="cart-item-remove" data-id="${item.id}"><i class='bx bx-trash'></i></button>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Actualizar el icono del carrito después de renderizar el carrito
        updateCartIcon();
    }

    function updateCartItemQuantity(id, action) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Verificar si el artículo ya existe en el carrito
        const existingItem = cart.find(item => item.id === id);
    
        if (existingItem) {
            // El artículo ya existe, actualizar la cantidad
            if (action === 'increase') {
                existingItem.quantity += 1;
            } else if (action === 'decrease' && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        }
    
        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Actualizar la visualización del carrito
        renderCart();
    }

    function removeCartItem(id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function clearCart() {
        localStorage.removeItem('cart');
        cartItemsContainer.innerHTML = '';
        totalPriceElement.textContent = '0.00';

        // Actualizar el icono del carrito después de limpiar el carrito
        updateCartIcon();
    }

    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('increase-quantity')) {
            const id = event.target.getAttribute('data-id');
            updateCartItemQuantity(id, 'increase');
        } else if (event.target.classList.contains('decrease-quantity')) {
            const id = event.target.getAttribute('data-id');
            updateCartItemQuantity(id, 'decrease');
        } else if (event.target.closest('.cart-item-remove')) { // Change here
            const id = event.target.closest('.cart-item-remove').getAttribute('data-id'); // Change here
            removeCartItem(id);
        }

        // Actualizar el icono del carrito después de cualquier acción en los elementos del carrito
        updateCartIcon();
    });

    document.querySelector('.clear-cart').addEventListener('click', clearCart);

    renderCart();

    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartIconText = document.querySelector('.cart-icon-text');

        let totalItems = 0;
        cart.forEach(item => {
            totalItems += item.quantity;
        });

        if (totalItems > 0) {
            cartIconText.textContent = totalItems;
            cartIconText.style.display = 'inline-block';
        } else {
            cartIconText.style.display = 'none';
        }
    }
});
