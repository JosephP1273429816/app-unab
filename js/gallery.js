// JavaScript para controlar la galería
const gallery = document.querySelector('.gallery');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

function moveGallery(direction) {
    if (direction === 'next' && currentIndex < galleryItems.length - 1) {
        currentIndex++;
    } else if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
    }

    const newPosition = galleryItems[currentIndex].offsetLeft;
    gallery.scrollTo({
        left: newPosition,
        behavior: 'smooth'
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveGallery('prev');
    } else if (e.key === 'ArrowRight') {
        moveGallery('next');
    }
});
