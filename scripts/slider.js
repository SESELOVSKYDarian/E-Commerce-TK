function cambiarImagenYTexto(source, title, text, price) {
    document.querySelector("#imagenSlide").setAttribute("src", source);
    document.querySelector("#textoTituloSlide").textContent = title;
    document.querySelector("#textoSlide").textContent = text;
    document.querySelector("#textPrice").textContent = price;
}

function cambiarMaxWidth(maxWidth) {
    document.querySelector("#imagenSlide").style.maxWidth = maxWidth;
}

document.querySelector("#radio1").addEventListener("click", () => {
    cambiarImagenYTexto(
        "/multimedia/images/products/phones/iphones/iphone12pro.png",
        "iPhone 12 Pro",
        "The iPhone 12 Pro features a 6.1' Super Retina XDR display, a powerful A14 Bionic chip, and a triple-camera system with LiDAR for advanced photography and AR. It offers 5G connectivity and an elegant stainless steel design.",
        "$900.000"
    );
    cambiarMaxWidth("70%");
});

document.querySelector("#radio2").addEventListener("click", () => {
    cambiarImagenYTexto(
        "/multimedia/images/products/watches/apple-watches/apple-watch-series-7.png",
        "Apple Watch Series 7",
        "The Apple Watch Series 7 features a larger, always-on Retina display, durable design, and advanced health monitoring capabilities including ECG and blood oxygen measurements. It offers faster charging and new colors, making it a versatile companion for fitness and daily life.",
        "$660.900"
    );
    cambiarMaxWidth("82%");
});

document.querySelector("#radio3").addEventListener("click", () => {
    cambiarImagenYTexto(
        "/multimedia/images/products/monitors/samsung/smartm8slim.png",
        "Monitor Smart M8 32' 4K Slim Design",
        "The Samsung Smart Monitor M8 32' 4K UHD combines a high-resolution display with smart features including Tizen OS, access to streaming apps, and voice assistants. Its ultra-slim design offers versatile connectivity and extras like integrated speakers and a detachable SlimFit camera.",
        "$120.000"
    );
    cambiarMaxWidth("98%");
});


document.addEventListener("DOMContentLoaded", function() {
    const carouselSlide = document.querySelector(".carousel-slide");
    const carouselImages = document.querySelectorAll(".carousel-slide img");

    // Configuración
    const intervalTime = 2000; // Tiempo en milisegundos entre cada slide (ajustado a 2 segundos)
    const slideWidth = carouselImages[0].clientWidth; // Ancho de cada slide
    let slideIndex = 0;

    // Ajuste inicial para centrar las imágenes
    const initialOffset = (carouselSlide.clientWidth - slideWidth) / 2;
    carouselSlide.style.transform = `translateX(-${initialOffset}px)`;

    // Función para pasar al siguiente slide
    function nextSlide() {
        // Incrementa el índice del slide
        slideIndex++;

        // Establece el desplazamiento en el carrusel
        carouselSlide.style.transition = 'transform 0.4s ease';
        carouselSlide.style.transform = `translateX(-${initialOffset + slideIndex * slideWidth}px)`;

        // Si llega al último slide, vuelve al inicio
        if (slideIndex >= carouselImages.length - 1) {
            setTimeout(() => {
                slideIndex = 0;
                carouselSlide.style.transition = 'none';
                carouselSlide.style.transform = `translateX(-${initialOffset}px)`;
                setTimeout(() => carouselSlide.style.transition = 'transform 0.4s ease', 50);
            }, 400);
        }
    }

    // Inicia el carrusel automáticamente
    setInterval(nextSlide, intervalTime);
});
