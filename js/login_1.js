// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
  console.log("Activando modo oscuro...");
  document.body.classList.add("dark-mode");
  const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
  if (link) {
    link.href = "css/login-dark.css"; // Establecer el enlace al modo oscuro
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
    link.href = "css/login.css"; // Establecer el enlace al modo claro
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
  apiKey: "AIzaSyAUg3rSb49LaMSXyONB7wdjQRClog3lC5I",
  authDomain: "unab-app-ea396.firebaseapp.com",
  projectId: "unab-app-ea396",
  storageBucket: "unab-app-ea396.appspot.com",
  messagingSenderId: "883439198464",
  appId: "1:883439198464:web:44c91c737efea0521093e5",
  measurementId: "G-DJ2T3GY8E3",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm["id"].value;
  const password = loginForm["password"].value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Redirige al usuario a "inicio.html" después del inicio de sesión
    window.location.href = "inicio.html";
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    alert("Contraseña o correo invalido")
    // Aquí puedes mostrar un mensaje de error al usuario si lo deseas
  }
});
