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
  apiKey: "AIzaSyAUg3rSb49LaMSXyONB7wdjQRClog3lC5I",
  authDomain: "unab-app-ea396.firebaseapp.com",
  projectId: "unab-app-ea396",
  storageBucket: "unab-app-ea396.appspot.com",
  messagingSenderId: "883439198464",
  appId: "1:883439198464:web:44c91c737efea0521093e5",
  measurementId: "G-DJ2T3GY8E3",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();

// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
  console.log("Activando modo oscuro...");
  document.body.classList.add("dark-mode");
  const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
  if (link) {
    link.href = "css/registro-dark.css"; // Establecer el enlace al modo oscuro
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
    link.href = "css/registro.css"; // Establecer el enlace al modo claro
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
