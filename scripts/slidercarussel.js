function cambiarMaxWidth(maxWidth) {
    document.querySelector("#imagenSlide").style.maxWidth = maxWidth;
}
document.addEventListener("DOMContentLoaded", function() {
  const products = [
      {
          price: "$60.000",
          title: "Controller wireless DualSense™",
          description: "The Wireless DualSense™ Controller for PS5 offers advanced haptic feedback, adaptive triggers, and a built-in microphone. It enhances your gaming experience with its immersive features.",
          imageUrl: "/multimedia/images/products/joysticks/ps5dualsense.png",
          shopUrl: "/public/products/index/gaming/specific-products/controldualsense.html"
      },
      {
          price: "$150.000",
          title: "JBL Tune 750BTNC",
          description: "The JBL Tune 750BTNC wireless headphones feature active noise cancellation, a 15-hour battery life, and powerful JBL Pure Bass sound.",
          imageUrl: "/multimedia/images/products/airpods/jbl/jbl_tune_750btnc.png",
          shopUrl: "public/products/index/gaming/specific-products/jbltune520bt.html"
      },
      {
        price: "$900.000",
        title: "Apple iPhone 12 Pro",
        description: "Experience the next level of performance with the Apple iPhone 12 Pro. Featuring a stunning Super Retina XDR display, A14 Bionic chip, and Pro camera system.",
        imageUrl: "/multimedia/images/products/phones/iphones/iphone12promax.png",
        shopUrl: "/public/products/phones/apple/iphone12pro.html"
      },
      {
        price: "$100.000",
        title: "Xiaomi Mi Band 6",
        description: "Xiaomi Mi Band 6 offers a large AMOLED display, SpO2 tracking, and long battery life. A budget-friendly fitness tracker with comprehensive health monitoring.",
        imageUrl: "/multimedia/images/products/watches/xiaomi/xiaomi_mi_band_6.png",
        shopUrl: "/public/products/wearables/xiaomi/miband6.html"
      }
  ];

  let currentIndex = 0;
  const productPrice = document.getElementById('product-price');
  const productTitle = document.getElementById('product-title');
  const productDescription = document.getElementById('product-description');
  const productImage = document.getElementById('product-image');
  const shopNowLink = document.getElementById('shop-now');

  const updateProductDetails = (index) => {
      const product = products[index];
      productPrice.textContent = product.price;
      productTitle.textContent = product.title;
      productDescription.textContent = product.description;
      productImage.src = product.imageUrl;
      shopNowLink.href = product.shopUrl;
  };

  const startCarousel = () => {
      interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % products.length;
          updateProductDetails(currentIndex);
      }, 6000);
  };

  const stopCarousel = () => {
      clearInterval(interval);
  };

  const productImageWrapper = document.querySelector('.product-image img');

  productImageWrapper.addEventListener('mouseenter', stopCarousel);
  productImageWrapper.addEventListener('mouseleave', startCarousel);

  updateProductDetails(currentIndex);
  startCarousel();
});
