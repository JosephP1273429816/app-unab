// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
    console.log("Activando modo oscuro...");
    document.body.classList.add("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "css/login-dark.css";
        const canvas = document.getElementById("galaxyCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let stars = [];
        const numStars = 200;
        const starSpeed = 0.1;

        function createStars() {
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    speedX: (Math.random() - 0.5) * starSpeed,
                    speedY: (Math.random() - 0.5) * starSpeed,
                    alpha: Math.random(),
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#2196F3";

            for (let star of stars) {
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        function updateStars() {
            for (let star of stars) {
                star.x += star.speedX;
                star.y += star.speedY;

                if (star.x < 0 || star.x > canvas.width) {
                    star.x = Math.random() * canvas.width;
                }
                if (star.y < 0 || star.y > canvas.height) {
                    star.y = Math.random() * canvas.height;
                }

                star.alpha += (Math.random() - 0.5) * 0.02;
                star.alpha = Math.max(0, Math.min(1, star.alpha));
            }
        }

        function createAsteroids() {
            for (let i = 0; i < 10; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * starSpeed * 5,
                    speedY: (Math.random() - 0.5) * starSpeed * 5,
                    alpha: Math.random(),
                });
            }
        }

        function animateStars() {
            drawStars();
            updateStars();
            requestAnimationFrame(animateStars);
        }

        createStars();
        createAsteroids();
        animateStars();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            createStars();
            createAsteroids();
        });
    }
    localStorage.setItem("darkMode", "true"); // Guardar el estado del modo oscuro
    const logoImg = document.getElementById("logo-img");
    if (logoImg) {
        logoImg.src = "img/logo-white.png"; // Ruta de la imagen en modo oscuro
    }
}

// Función para cambiar al modo claro
function activarModoClaro() {
    console.log("Activando modo claro...");
    document.body.classList.remove("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "css/login.css";
        const canvas = document.getElementById("galaxyCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let stars = [];
        const numStars = 200;
        const starSpeed = 0.1;

        function createStars() {
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5,
                    speedX: (Math.random() - 0.5) * starSpeed,
                    speedY: (Math.random() - 0.5) * starSpeed,
                    alpha: Math.random(),
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";

            for (let star of stars) {
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        function updateStars() {
            for (let star of stars) {
                star.x += star.speedX;
                star.y += star.speedY;

                if (star.x < 0 || star.x > canvas.width) {
                    star.x = Math.random() * canvas.width;
                }
                if (star.y < 0 || star.y > canvas.height) {
                    star.y = Math.random() * canvas.height;
                }

                star.alpha += (Math.random() - 0.5) * 0.02;
                star.alpha = Math.max(0, Math.min(1, star.alpha));
            }
        }

        function createAsteroids() {
            for (let i = 0; i < 10; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 4 + 2,
                    speedX: (Math.random() - 0.5) * starSpeed * 5,
                    speedY: (Math.random() - 0.5) * starSpeed * 5,
                    alpha: Math.random(),
                });
            }
        }

        function animateStars() {
            drawStars();
            updateStars();
            requestAnimationFrame(animateStars);
        }

        createStars();
        createAsteroids();
        animateStars();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = [];
            createStars();
            createAsteroids();
        });
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

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyBqfaryp-wOILMxTiBM1tz3ZNUUwWN_T7s",
    authDomain: "miunab.firebaseapp.com",
    projectId: "miunab",
    storageBucket: "miunab.appspot.com",
    messagingSenderId: "372715988870",
    appId: "1:372715988870:web:0a9722b02f547310e36e07",
    measurementId: "G-2ZJR905S83",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    const email = loginForm["id"].value;
    const password = loginForm["password"].value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirige al usuario a "inicio.html" después del inicio de sesión
        window.location.href = "/html/inicio.html";
    } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        alert("Contraseña o correo invalido");
        // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
    }
});