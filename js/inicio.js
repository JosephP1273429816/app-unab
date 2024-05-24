document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", function() {
        navList.classList.toggle("active");
    });
});
// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
    document.body.classList.add("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "/css/styles-dark.css"; // Establecer el enlace al modo oscuro
    }
    localStorage.setItem("darkMode", "true"); // Guardar el estado del modo oscuro
    const logoImg = document.getElementById("logo-img");
    if (logoImg) {
        logoImg.src = "/img/logo-white.png"; // Ruta de la imagen en modo oscuro
    }
}

// Función para cambiar al modo claro
function activarModoClaro() {
    document.body.classList.remove("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "/css/styles.css"; // Establecer el enlace al modo claro
    }
    localStorage.setItem("darkMode", "false"); // Guardar el estado del modo claro
}

// Cambiar al modo oscuro si está activado en el localStorage
if (modoOscuro === "true") {
    activarModoOscuro();
} else {
    activarModoClaro();
}