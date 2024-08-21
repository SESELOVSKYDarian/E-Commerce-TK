// filtros de desplazamiento de pantalla 
document.querySelectorAll('a.Filters').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const filterButton = document.getElementById('filterButton');
    const products = document.querySelectorAll('.product');
  
    // Filter products when the button is clicked
    filterButton.addEventListener('click', function () {
      const minPrice = parseInt(minPriceInput.value, 10) || 0; // Default to 0 if empty
      const maxPrice = parseInt(maxPriceInput.value, 10) || Infinity; // Default to Infinity if empty
  
      products.forEach(product => {
        const productPrice = parseInt(product.dataset.productPrice, 10);
        if (productPrice >= minPrice && productPrice <= maxPrice) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  });

  document.getElementById('filterIcon').addEventListener('click', function() {
    const filters = document.querySelector('.filters');
    if (filters.style.display === 'none' || filters.style.display === '') {
      filters.style.display = 'block';
    } else {
      filters.style.display = 'none';
    }
  });
  