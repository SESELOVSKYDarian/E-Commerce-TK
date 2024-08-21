document.addEventListener('DOMContentLoaded', () => {
    // Mostrar la animación de carga
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.classList.remove('hidden');

    // Ocultar la animación de carga después de 3 segundos
    setTimeout(() => {
        loadingContainer.classList.add('hidden');
    }, 1500);
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
        const productImage = button.getAttribute('data-product-image'); // Obtener la URL de la imagen
        const productUrl = button.getAttribute('data-product-url');

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            cart[productIndex].quantity += 1;
        } else {
            const newProduct = {
                id: productId,
                title: productTitle,
                price: productPrice,
                img: productImage, // Añadir la URL de la imagen
                url: productUrl,
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
