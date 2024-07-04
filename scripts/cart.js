document.addEventListener('DOMContentLoaded', () => {
    // Show the loading animation
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.classList.remove('hidden');

    // Hide the loading animation once the page content is fully loaded
    window.addEventListener('load', () => {
        loadingContainer.classList.add('hidden');
    });
})
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

        // Update cart icon after adding product
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

    // Call updateCartIcon when the page loads to set the initial cart icon state
    updateCartIcon();
});
