// Configura tu proyecto de Firebase
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

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // Usuario autenticado, puedes realizar acciones adicionales aquí
    console.log("El usuario ha iniciado sesión:", user.email);
    const userEmail = user.email.toLowerCase(); // Convertir el correo a minúsculas para comparación
  } else {
    console.error("No hay usuario autenticado.");
    window.location.href = "/index.html"; // Redirige al inicio
  }
});
