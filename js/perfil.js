// Función para generar y mostrar el código de barras Code 128 en un elemento SVG
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navList = document.querySelector(".nav-list");

    menuToggle.addEventListener("click", function() {
        navList.classList.toggle("active");
    });

    // Configura tu proyecto de Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBqfaryp-wOILMxTiBM1tz3ZNUUwWN_T7s",
        authDomain: "miunab.firebaseapp.com",
        projectId: "miunab",
        storageBucket: "miunab.appspot.com",
        messagingSenderId: "372715988870",
        appId: "1:372715988870:web:0a9722b02f547310e36e07",
        measurementId: "G-2ZJR905S83",
    };

    // Inicializa Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            const userEmail = user.email.toLowerCase(); // Convertir el correo a minúsculas para comparación

            // Referencia a la base de datos de Firebase
            const dbRef = firebase.database().ref("usuarios");

            // Escuchar cambios en la base de datos
            dbRef.on("value", function(snapshot) {
                const usuarios = snapshot.val();

                if (usuarios) {
                    // Iterar sobre todos los usuarios en la base de datos
                    Object.keys(usuarios).forEach((userId) => {
                        const usuario = usuarios[userId];
                        const correoUsuario = usuario.correo.toLowerCase(); // Convertir el correo del usuario actual a minúsculas

                        if (correoUsuario === userEmail) {
                            // Actualizar los datos del perfil en la página
                            document.getElementById("studentName").innerText = usuario.nombre;
                            document.getElementById("studentId").innerText = usuario.id;
                            document.getElementById("studentCarr").innerText =
                                usuario.carrera;

                            // Obtener la referencia a la imagen del usuario en Firebase Storage
                            const storageRef = firebase.storage().ref();
                            const photoRef = storageRef.child(
                                "perfiles/" + user.uid + "/perfil.png"
                            );

                            // Obtener la URL de descarga de la imagen y mostrarla en el perfil
                            photoRef
                                .getDownloadURL()
                                .then(function(url) {
                                    document.getElementById("userPhoto").src = url; // Mostrar la imagen del usuario
                                })
                                .catch(function(error) {
                                    console.error("Error al obtener la URL de la imagen:", error);
                                });

                            // Generar el código de barras con el ID de estudiante
                            generateBarcode(usuario.id);
                        }
                    });
                } else {
                    console.error(
                        "No se encontraron datos de usuarios en la base de datos."
                    );
                }
            });
        } else {
            console.error("No hay usuario autenticado.");
            window.location.href = "/index.html"; // Redirige al inicio si no hay usuario autenticado
        }
    });

    // Función para generar y mostrar el código de barras Code 128 en un elemento SVG
    function generateBarcode(studentId) {
        JsBarcode("#barcodeSVG", studentId, {
            format: "CODE128", // Tipo de código de barras
            displayValue: false, // Ocultar el valor del código
            width: 2, // Ajusta el ancho del código de barras (valor mayor hace que sea más ancho)
            height: 50, // Altura del código de barras
        });
    }
});

function toggleContextMenu(event) {
    event.preventDefault(); // Evita que el enlace se abra
    const menu = document.getElementById("contextMenu");
    const button = event.currentTarget;

    // Mostrar u ocultar el menú según su estado actual
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";

        const buttonRect = button.getBoundingClientRect();
        const menuRect = menu.getBoundingClientRect();

        // Calcula la posición horizontal del menú
        let leftPosition = buttonRect.left + button.offsetWidth;

        // Ajusta la posición si el menú se sale de la ventana
        if (leftPosition + menuRect.width > window.innerWidth) {
            leftPosition = window.innerWidth - menuRect.width;
        }

        menu.style.left = leftPosition + "px";
        menu.style.top = buttonRect.top + "px";
    }
}
// Función para ocultar el menú si se hace clic en cualquier parte de la pantalla excepto en el menú o el botón
function closeMenuOnClickOutside(event) {
    const menu = document.getElementById("contextMenu");
    const button = document.querySelector(".config-button");

    // Verifica si el clic ocurrió fuera del menú y el botón
    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = "none";
    }
}

// Agregar manejador de eventos al hacer clic en cualquier parte de la pantalla
document.addEventListener("click", closeMenuOnClickOutside);

document.addEventListener("DOMContentLoaded", function() {
    var profileCard = document.getElementById("profileCard");
    var cardFront = document.querySelector(".card-front");
    var cardBack = document.querySelector(".card-back");

    // Contador de volteos
    var volteos = 0;
    // Número deseado de volteos para abrir otro HTML
    var volteosDeseados = 10; // Puedes ajustar este número según lo necesites

    profileCard.addEventListener("click", function() {
        profileCard.classList.toggle("flipped"); // Voltear el carnet al hacer clic
        if (profileCard.classList.contains("flipped")) {
            // Mostrar el contenido de la parte trasera cuando el carnet está volteado
            cardFront.style.display = "none";
            cardBack.style.display = "block";
            volteos++; // Incrementar el contador de volteos
            // Verificar si se alcanzó el número deseado de volteos
            if (volteos >= volteosDeseados) {
                // Redireccionar a otro HTML
                window.location.href = "doom.html"; // Reemplaza "otro.html" con la ruta del HTML que deseas abrir
            }
        } else {
            // Mostrar el contenido de la parte frontal cuando el carnet está en su posición original
            cardBack.style.display = "none";
            cardFront.style.display = "block";
        }
    });
});

// Obtener el estado del modo oscuro del localStorage
const modoOscuro = localStorage.getItem("darkMode");

// Función para cambiar al modo oscuro
function activarModoOscuro() {
    document.body.classList.add("dark-mode");
    const link = document.querySelector("link#mapa-css"); // Seleccionar el enlace por su ID
    if (link) {
        link.href = "/css/styles_perfil-dark.css"; // Establecer el enlace al modo oscuro
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
        link.href = "/css/styles_perfil.css"; // Establecer el enlace al modo claro
    }
    localStorage.setItem("darkMode", "false"); // Guardar el estado del modo claro
}

// Cambiar al modo oscuro si está activado en el localStorage
if (modoOscuro === "true") {
    activarModoOscuro();
} else {
    activarModoClaro();
}