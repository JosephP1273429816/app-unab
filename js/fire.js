// Configura tu proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAUg3rSb49LaMSXyONB7wdjQRClog3lC5I",
    authDomain: "unab-app-ea396.firebaseapp.com",
    projectId: "unab-app-ea396",
    storageBucket: "unab-app-ea396.appspot.com",
    messagingSenderId: "883439198464",
    appId: "1:883439198464:web:44c91c737efea0521093e5",
    measurementId: "G-DJ2T3GY8E3"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // Usuario autenticado, puedes realizar acciones adicionales aquí
        console.log("El usuario ha iniciado sesión:", user.email);
        const userEmail = user.email.toLowerCase(); // Convertir el correo a minúsculas para comparación

        // Redirigir al usuario autenticado a la página de inicio
        window.location.href = "inicio.html";
    } else {
        console.error("No hay usuario autenticado.");
        window.location.href = "index.html"; // Redirige al inicio
    }
});
