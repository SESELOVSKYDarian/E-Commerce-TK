document.addEventListener('DOMContentLoaded', () => {
  const favoritesListElement = document.getElementById('favorites-list');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = item.title;
    favoritesListElement.appendChild(listItem);
  });
});
