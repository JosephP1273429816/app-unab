// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBqfaryp-wOILMxTiBM1tz3ZNUUwWN_T7s",
    authDomain: "miunab.firebaseapp.com",
    databaseURL: "https://miunab-default-rtdb.firebaseio.com",
    projectId: "miunab",
    storageBucket: "miunab.appspot.com",
    messagingSenderId: "372715988870",
    appId: "1:372715988870:web:0a9722b02f547310e36e07",
    measurementId: "G-2ZJR905S83",
};
// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById("resetForm").addEventListener("submit", function(e) {
    e.preventDefault();
    var emailAddress = document.getElementById("email").value;

    firebase
        .auth()
        .sendPasswordResetEmail(emailAddress)
        .then(function() {
            alert("Correo de restablecimiento enviado!");
            window.location.href = "/index.html";
        })
        .catch(function(error) {
            alert("Error: " + error.message);
        });
});
// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
    console.log("Activando modo oscuro...");
    document.body.classList.add("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "/css/login-dark.css"; // Establecer el enlace al modo oscuro
    }
    localStorage.setItem("darkMode", "true"); // Guardar el estado del modo oscuro
    const logoImg = document.getElementById("logo-img");
    if (logoImg) {
        logoImg.src = "/img/logo-white.png"; // Ruta de la imagen en modo oscuro
    }
}

// Función para cambiar al modo claro
function activarModoClaro() {
    console.log("Activando modo claro...");
    document.body.classList.remove("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "/css/login.css"; // Establecer el enlace al modo claro
    }
    localStorage.setItem("darkMode", "false"); // Guardar el estado del modo claro
}

// Cambiar al modo oscuro si está activado en el localStorage
if (modoOscuro === "true") {
    console.log("Modo oscuro activado desde el localStorage.");
    activarModoOscuro();
} else {
    console.log("Modo claro activado desde el localStorage.");
    activarModoClaro();
}