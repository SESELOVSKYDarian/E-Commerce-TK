document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.querySelector('#searchIcon');
    const searchDropdown = document.querySelector('#searchDropdown');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('#searchResults');

    // Toggle search dropdown
    searchIcon.addEventListener('click', function () {
        searchDropdown.classList.toggle('show');
        searchInput.focus();
    });

    // Show or hide search results based on input
    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        const items = searchResults.querySelectorAll('li');

        if (query.length > 0) {
            searchResults.classList.add('show'); // Show search results
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        } else {
            searchResults.classList.remove('show'); // Hide search results
        }
    });

    // Close the search dropdown when clicking outside of it
    document.addEventListener('click', function (e) {
        if (!searchDropdown.contains(e.target) && !searchIcon.contains(e.target)) {
            searchDropdown.classList.remove('show');
            searchResults.classList.remove('show'); // Hide search results
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const searchIcons = document.querySelectorAll('.search-icon'); // Selecciona todos los iconos de búsqueda
    const searchDropdown = document.querySelector('#searchDropdown');
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('#searchResults');

    // Función para manejar la barra de búsqueda en pantallas pequeñas
    function handleMobileSearch() {
        if (window.innerWidth <= 768) { // Detecta si el ancho de la pantalla es menor o igual a 768px
            // Toggle search dropdown para cada ícono de búsqueda
            searchIcons.forEach(icon => {
                icon.addEventListener('click', function (e) {
                    searchDropdown.classList.toggle('show');
                    searchInput.focus();
                    e.stopPropagation(); // Evita el cierre inmediato al hacer clic
                });
            });

            // Mostrar u ocultar resultados de búsqueda según la entrada
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.toLowerCase();
                const items = searchResults.querySelectorAll('li');

                if (query.length > 0) {
                    searchResults.classList.add('show'); // Mostrar resultados de búsqueda
                    items.forEach(item => {
                        const text = item.textContent.toLowerCase();
                        if (text.includes(query)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                } else {
                    searchResults.classList.remove('show'); // Ocultar resultados de búsqueda
                }
            });

            // Cerrar el dropdown de búsqueda al hacer clic fuera de él
            document.addEventListener('click', function (e) {
                if (!searchDropdown.contains(e.target) && !e.target.classList.contains('search-icon')) {
                    searchDropdown.classList.remove('show');
                    searchResults.classList.remove('show'); // Ocultar resultados de búsqueda
                }
            });
        }
    }

    // Ejecuta la función al cargar la página
    handleMobileSearch();

    // Reejecuta la función cuando se cambia el tamaño de la ventana
    window.addEventListener('resize', handleMobileSearch);
});
