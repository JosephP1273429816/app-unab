// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUg3rSb49LaMSXyONB7wdjQRClog3lC5I",
  authDomain: "unab-app-ea396.firebaseapp.com",
  projectId: "unab-app-ea396",
  storageBucket: "unab-app-ea396.appspot.com",
  messagingSenderId: "883439198464",
  appId: "1:883439198464:web:44c91c737efea0521093e5",
  measurementId: "G-DJ2T3GY8E3",
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Verifica el estado de autenticación al cargar la página
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario autenticado, puedes realizar acciones adicionales aquí
    console.log("El usuario ha iniciado sesión:", user.email);
    const userEmail = user.email.toLowerCase(); // Convertir el correo a minúsculas para comparación

    // Obtener una referencia a la base de datos de Firebase
    const dbRef = firebase.database().ref("usuarios");
    // Realizar acciones adicionales con la base de datos si es necesario
  } else {
    console.error("No hay usuario autenticado.");
    window.location.href = "index.html"; // Redirige al inicio
  }
});

const enviarCorreoRestablecimiento = () => {
  const email = firebase.auth().currentUser.email;
  console.log("Correo del usuario:", email);

  firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log(
        "Correo de restablecimiento de contraseña enviado correctamente."
      );
      alert(
        "Se ha enviado un correo electrónico de restablecimiento de contraseña a su dirección de correo electrónico."
      );
    })
    .catch((error) => {
      console.error(
        "Error al enviar el correo de restablecimiento de contraseña:",
        error
      );
      alert(
        "Ha ocurrido un error al enviar el correo de restablecimiento de contraseña. Por favor, inténtelo de nuevo más tarde."
      );
    });
};

const botonRestablecerContrasena = document.getElementById("contraseña");
botonRestablecerContrasena.addEventListener(
  "click",
  enviarCorreoRestablecimiento
);

// Variables globales para Cropper.js y ventana modal
let cropper;
let imagenEditada; // Variable para almacenar la imagen editada
const modal = document.getElementById("modal-edicion-imagen");
const btnEditarImagen = document.getElementById("editar-imagen");
const btnGuardarCambiosModal = document.getElementById("guardar-cambios-modal");
const spanCerrarModal = document.querySelector("#modal-edicion-imagen .close");

// Función para cargar la imagen seleccionada en Cropper.js
function cargarImagenEnCropper(file) {
  const image = document.getElementById("imagen-cropper");
  const nombreArchivo = document.getElementById("nombre-archivo");
  nombreArchivo.textContent = file.name; // Actualizar el contenido con el nombre del archivo
  image.src = URL.createObjectURL(file);
  image.onload = function () {
    cropper = new Cropper(image, {
      aspectRatio: 1, // Proporción de aspecto cuadrada (puedes ajustarla según tus necesidades)
      viewMode: 1,
      autoCropArea: 0.9,
    });
  };
}

// Evento al hacer clic en el botón de editar imagen
btnEditarImagen.addEventListener("click", function () {
  modal.style.display = "block"; // Mostrar la ventana modal
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
      cargarImagenEnCropper(file);
    }
  });
  fileInput.click(); // Simular clic en el input de archivo oculto
});

// Evento al hacer clic en el botón de guardar cambios en la ventana modal
btnGuardarCambiosModal.addEventListener("click", function () {
  if (cropper) {
    cropper.getCroppedCanvas().toBlob((blob) => {
      // Guardar la imagen editada en la variable global
      imagenEditada = blob;
      cropper.destroy(); // Destruir Cropper.js después de guardar la imagen
      modal.style.display = "none"; // Ocultar la ventana modal
    });
  } else {
    console.error("No se ha seleccionado ninguna imagen.");
    alert("No se ha seleccionado ninguna imagen.");
  }
});

// Evento para cerrar la ventana modal al hacer clic en la 'x'
spanCerrarModal.addEventListener("click", function () {
  modal.style.display = "none";
  if (cropper) {
    cropper.destroy(); // Destruir Cropper.js al cerrar la ventana modal
  }
});

// Evento al hacer clic en el botón de guardar principal
const btnGuardarPrincipal = document.getElementById("guardar-cambios");
btnGuardarPrincipal.addEventListener("click", function () {
  const usuarioActual = firebase.auth().currentUser;

  if (usuarioActual) {
    if (imagenEditada) {
      const storageRef = firebase.storage().ref();
      const perfilRef = storageRef.child(
        `perfiles/${usuarioActual.uid}/perfil.png`
      );
      perfilRef
        .put(imagenEditada)
        .then(() => {
          console.log("Imagen subida correctamente");
          alert("Imagen subida correctamente.");
          location.reload();
        })
        .catch((error) => {
          console.error("Error al subir la imagen:", error);
          alert("Error al subir la imagen.");
        });
    } else {
      console.warn(
        "No se ha seleccionado ninguna imagen, pero se guardaron otros cambios."
      );
      alert(
        "No se ha seleccionado ninguna imagen, pero se guardaron otros cambios."
      );
      location.reload();
    }
  } else {
    console.error("Usuario no autenticado.");
    alert("Usuario no autenticado.");
  }
});

// Función para cambiar al modo oscuro
function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
}

// Función para cerrar sesión
function cerrarSesion() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sesión cerrada exitosamente");
      window.location.assign("index.html");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión", error);
    });
}

const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
  document.body.classList.add("dark-mode");
  const link = document.querySelector("link#mapa-css");
  if (link) {
    link.href = "css/styles_config-dark.css";
  }
  localStorage.setItem("darkMode", "true");
  const logoImg = document.getElementById("logo-img");
  if (logoImg) {
    logoImg.src = "img/logo-white.png";
  }
}

// Función para cambiar al modo claro
function activarModoClaro() {
  document.body.classList.remove("dark-mode");
  const link = document.querySelector("link#mapa-css");
  if (link) {
    link.href = "css/styles_config.css";
  }
  localStorage.setItem("darkMode", "false");
}

if (modoOscuro === "true") {
  activarModoOscuro();
} else {
  activarModoClaro();
}

const botonCambiarModo = document.getElementById("modo-oscuro");
botonCambiarModo.addEventListener("change", toggleDarkMode);

const botonCerrarSesion = document.getElementById("cerrar-sesion");
botonCerrarSesion.addEventListener("click", cerrarSesion);

const savedDarkMode = localStorage.getItem("darkMode");
if (savedDarkMode === "true") {
  document.body.classList.add("dark-mode");
  botonCambiarModo.checked = true;
} else if (savedDarkMode === null) {
  const prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDarkMode) {
    document.body.classList.add("dark-mode");
    botonCambiarModo.checked = true;
    localStorage.setItem("darkMode", true);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
  });
});
