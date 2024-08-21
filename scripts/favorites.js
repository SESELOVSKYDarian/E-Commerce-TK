document.addEventListener('DOMContentLoaded', () => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  document.querySelectorAll('.fav').forEach(icon => {
    const productId = icon.getAttribute('data-product-id');
    if (favorites.some(item => item.id === productId)) {
      icon.classList.remove('bx-heart');
      icon.classList.add('bxs-heart', 'red');
    }
  });

  document.querySelectorAll('.fav').forEach(icon => {
    icon.addEventListener('click', () => {
      const productId = icon.getAttribute('data-product-id');
      const productTitle = icon.getAttribute('data-product-title');
      const productPrice = icon.closest('.card').querySelector('.card-price').textContent;
      const productImg = icon.closest('.card').querySelector('.card-img').src;

      if (icon.classList.contains('bx-heart')) {
        icon.classList.remove('bx-heart');
        icon.classList.add('bxs-heart', 'red');
        addFavorite(productId, productTitle, productPrice, productImg);
      } else {
        icon.classList.remove('bxs-heart', 'red');
        icon.classList.add('bx-heart');
        removeFavorite(productId);
      }
    });
  });

  function addFavorite(productId, productTitle, productPrice, productImg) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(item => item.id === productId)) {
      favorites.push({ id: productId, title: productTitle, price: productPrice, img: productImg });
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  function removeFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
});
