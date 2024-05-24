document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.gallery-image');
    let currentIndex = 0;
    let interval;
  
    function showImage(index) {
      images[currentIndex].classList.remove('active');
      currentIndex = (index + images.length) % images.length; // Para hacer el índice circular
      images[currentIndex].classList.add('active');
    }
  
    function showNextImage() {
      showImage(currentIndex + 1);
    }
  
    function showPrevImage() {
      showImage(currentIndex - 1);
    }
  
    function startAutoSlide() {
      interval = setInterval(showNextImage, 3000); // Cambia la imagen cada 3 segundos
    }
  
    function stopAutoSlide() {
      clearInterval(interval);
    }
  
    images.forEach((image, index) => {
      image.addEventListener('click', function (event) {
        stopAutoSlide();
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left; // Coordenada X relativa a la imagen
        if (x < rect.width / 2) {
          showPrevImage(); // Clic en la mitad izquierda de la imagen
        } else {
          showNextImage(); // Clic en la mitad derecha de la imagen
        }
        startAutoSlide();
      });
    });
  
    images[currentIndex].classList.add('active');
    startAutoSlide();
  });
  