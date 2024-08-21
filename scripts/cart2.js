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

            const formattedPrice = (item.price * item.quantity).toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });

            cartItem.innerHTML = `
                <div class="cart-flex">
                    <div class="cart-item-title">
                        <img src="${item.img}" alt="${item.title}" />
                        ${item.title}
                    </div>
                    <div class="middle-cart">
                        <div class="cart-item-price">$${formattedPrice}</div>
                        <a href="${item.url}" class="cart-item-see-more">See More</a>
                    </div>
                    <div class="end-cart">
                        <div class="cart-item-quantity">
                            <button class="decrease-quantity" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase-quantity" data-id="${item.id}">+</button>
                        </div>
                        <button class="cart-item-remove" data-id="${item.id}"><i class='bx bx-trash'></i></button>
                    </div>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        // Formatear el precio total
        const formattedTotalPrice = totalPrice.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        totalPriceElement.textContent = formattedTotalPrice;

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
        totalPriceElement.textContent = '0,00';

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
        } else if (event.target.closest('.cart-item-remove')) {
            const id = event.target.closest('.cart-item-remove').getAttribute('data-id');
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
