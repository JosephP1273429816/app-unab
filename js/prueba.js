// main.js

// Inicializa Firebase
const db = firebase.database();

// Escucha cambios en la base de datos para mostrar las publicaciones
db.ref("posts").on("child_added", (snapshot) => {
  const post = snapshot.val();
  displayPost(post);
});

// Función para mostrar una publicación en el muro
function displayPost(post) {
  const userWall = document.getElementById("user-wall");
  const postDiv = document.createElement("div");
  postDiv.innerHTML = `
        <img src="${post.photoUrl}" alt="${post.username}">
        <p>${post.username}</p>
        <p>${post.content}</p>
    `;
  userWall.appendChild(postDiv);
}

// Escucha el envío del formulario para crear una publicación
const postForm = document.getElementById("post-form");
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const postInput = document.getElementById("post-input");
  const content = postInput.value.trim();
  if (content !== "") {
    createPost(content);
    postInput.value = "";
  }
});

// Función para crear una nueva publicación en la base de datos
function createPost(content) {
  const currentUser = firebase.auth().currentUser;
  if (currentUser) {
    const userId = currentUser.uid;
    const usernameRef = db.ref(`users/${userId}/username`);
    const photoUrlRef = db.ref(`users/${userId}/photoUrl`);
    Promise.all([usernameRef.once("value"), photoUrlRef.once("value")])
      .then((snapshots) => {
        const username = snapshots[0].val();
        const photoUrl = snapshots[1].val();
        const newPostRef = db.ref("posts").push();
        newPostRef.set({
          userId: userId,
          username: username,
          photoUrl: photoUrl,
          content: content,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  } else {
    console.error("Usuario no autenticado");
  }
}
