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
                <button class="cart-item-remove" data-id="${item.id}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function updateCartItemQuantity(id, action) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Check if the item already exists in cart
        const existingItem = cart.find(item => item.id === id);
    
        if (existingItem) {
            // Item already exists, update quantity
            if (action === 'increase') {
                existingItem.quantity += 1;
            } else if (action === 'decrease' && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        } else {
            // Item doesn't exist in cart, add it
            const product = getProductById(id); // Implement getProductById to fetch product details
            if (product) {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1
                });
            }
        }
    
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Update the cart display
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
    }

    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('increase-quantity')) {
            const id = event.target.getAttribute('data-id');
            updateCartItemQuantity(id, 'increase');
        } else if (event.target.classList.contains('decrease-quantity')) {
            const id = event.target.getAttribute('data-id');
            updateCartItemQuantity(id, 'decrease');
        } else if (event.target.classList.contains('cart-item-remove')) {
            const id = event.target.getAttribute('data-id');
            removeCartItem(id);
        }
    });

    document.querySelector('.clear-cart').addEventListener('click', clearCart);

    renderCart();
});