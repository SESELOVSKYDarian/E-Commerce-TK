function cambiarImagenYTexto(source, title, text, price) {
    document.querySelector("#imagenSlide").setAttribute("src", source);
    document.querySelector("#textoTituloSlide").textContent = title;
    document.querySelector("#textoSlide").textContent = text;
    document.querySelector("#textPrice").textContent = price;
}

function cambiarMaxWidth(maxWidth) {
    document.querySelector("#imagenSlide").style.maxWidth = maxWidth;
}

function changePage(page) {
    document.getElementById("shopNow").href = page;
}

document.querySelector("#radio1").addEventListener("click", () => {
    cambiarImagenYTexto(
        "/multimedia/images/products/phones/iphones/iphone12pro.png",
        "iPhone 12 Pro",
        "The iPhone 12 Pro features a 6.1' Super Retina XDR display, a powerful A14 Bionic chip, and a triple-camera system with LiDAR for advanced photography and AR. It offers 5G connectivity and an elegant stainless steel design.",
        "$900.000"
    );
    cambiarMaxWidth("70%");
    changePage("/public/products/phones/apple/iphone12pro.html");
});

document.querySelector("#radio2").addEventListener("click", () => {
    cambiarImagenYTexto(
        "/multimedia/images/products/watches/apple-watches/apple-watch-series-7.png",
        "Apple Watch Series 7",
        "The Apple Watch Series 7 features a larger, always-on Retina display, durable design, and advanced health monitoring capabilities including ECG and blood oxygen measurements. It offers faster charging and new colors, making it a versatile companion for fitness and daily life.",
        "$660.900"
    );
    cambiarMaxWidth("82%");
    changePage("/public/products/watches/apple/applewatchesseries7.html");
});

document.querySelector("#radio3").addEventListener("click", () => {
    cambiarImagenYTexto(
        "/multimedia/images/products/monitors/samsung/smartm8slim.png",
        "Monitor Smart M8 32' 4K Slim Design",
        "The Samsung Smart Monitor M8 32' 4K UHD combines a high-resolution display with smart features including Tizen OS, access to streaming apps, and voice assistants. Its ultra-slim design offers versatile connectivity and extras like integrated speakers and a detachable SlimFit camera.",
        "$120.000"
    );
    cambiarMaxWidth("98%");
    changePage("/public/products/monitors/samsung/monitorsmartm8slim.html");
});
