document.addEventListener('DOMContentLoaded', () => {
  const favoritesListElement = document.getElementById('favorites-list');
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach(item => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.title;
    img.classList.add('card-img');

    const hr = document.createElement('hr');

    const textDiv = document.createElement('div');
    textDiv.classList.add('icon-text');

    const textCard = document.createElement('div');
    textCard.classList.add('text-card');

    const title = document.createElement('h3');
    title.classList.add('card-title');
    title.textContent = item.title;

    const price = document.createElement('p');
    price.classList.add('card-price');
    price.textContent = item.price;

    const iconCard = document.createElement('div');
    iconCard.classList.add('icon-card');

    const favIcon = document.createElement('i');
    favIcon.classList.add('bx', 'bxs-heart', 'fav', 'red');
    favIcon.setAttribute('data-product-id', item.id);
    favIcon.setAttribute('data-product-title', item.title);
    favIcon.addEventListener('click', () => {
      removeFavorite(item.id);
      card.remove();
    });
    iconCard.appendChild(favIcon);

    textCard.appendChild(title);
    textCard.appendChild(price);
    textDiv.appendChild(textCard);
    textDiv.appendChild(iconCard);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('card-buttons');

    const btnBuy = document.createElement('button');
    btnBuy.classList.add('btn-buy');
    btnBuy.textContent = 'Add to Cart';
    btnBuy.setAttribute('data-product-id', item.id);
    btnBuy.setAttribute('data-product-title', item.title);
    btnBuy.setAttribute('data-product-price', item.price);
    btnBuy.setAttribute('data-product-url', item.url);
    btnBuy.setAttribute('data-product-image', item.image);

    const btnMore = document.createElement('button');
    btnMore.classList.add('btn-more');
    btnMore.setAttribute('data-product-url', item.url);
    btnMore.innerHTML = '<a href="' + item.url + '"><strong>See More</strong></a>';

    buttonsDiv.appendChild(btnBuy);
    buttonsDiv.appendChild(btnMore);

    card.appendChild(img);
    card.appendChild(hr);
    card.appendChild(textDiv);
    card.appendChild(buttonsDiv);

    favoritesListElement.appendChild(card);
  });

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  let currentIndex = 0;

  function updateSliderPosition() {
    const slideWidth = favoritesListElement.children[0].offsetWidth;
    favoritesListElement.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSliderPosition();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < favorites.length - 1) {
      currentIndex++;
      updateSliderPosition();
    }
  });

  // Initialize the slider position
  updateSliderPosition();

  // Add touch event listeners for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      // Swipe left
      if (currentIndex < favorites.length - 1) {
        currentIndex++;
        updateSliderPosition();
      }
    }
    if (touchEndX > touchStartX) {
      // Swipe right
      if (currentIndex > 0) {
        currentIndex--;
        updateSliderPosition();
      }
    }
  }

  // Check the number of items and set the slider class accordingly
  const numberOfItems = favorites.length;
  if (numberOfItems >= 5) {
    favoritesListElement.classList.add('slider-left');
  } else {
    favoritesListElement.classList.add('slider-center');
  }
});

function removeFavorite(productId) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites = favorites.filter(item => item.id !== productId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

