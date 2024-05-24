import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    push,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqfaryp-wOILMxTiBM1tz3ZNUUwWN_T7s",
    authDomain: "miunab.firebaseapp.com",
    databaseURL: "https://miunab-default-rtdb.firebaseio.com",
    projectId: "miunab",
    storageBucket: "miunab.appspot.com",
    messagingSenderId: "372715988870",
    appId: "1:372715988870:web:0a9722b02f547310e36e07",
    measurementId: "G-2ZJR905S83",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

document
    .getElementById("registerForm")
    .addEventListener("submit", async(e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.toUpperCase();
        const id = document.getElementById("id").value.toUpperCase();
        const email = document.getElementById("email").value.trim().toLowerCase(); // Convertir a minúsculas y quitar espacios adicionales
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const carrera = document.getElementById("carrera").value;

        // Validar el correo electrónico
        if (!email.endsWith("@unab.edu.co")) {
            alert("El correo electrónico debe ser de dominio unab.edu.co.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;

            await push(ref(db, "usuarios"), {
                nombre: name,
                id: id,
                correo: email,
                uid: user.uid,
                carrera: carrera,
            });

            alert("Usuario registrado exitosamente!");
            window.location.href = "inicio.html";
        } catch (error) {
            alert("Error al registrar usuario: " + error.message);
        }
    });
// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
    console.log("Activando modo oscuro...");
    document.body.classList.add("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "/css/registro-dark.css"; // Establecer el enlace al modo oscuro
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
        link.href = "/css/registro.css"; // Establecer el enlace al modo claro
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