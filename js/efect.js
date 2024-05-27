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

function drawStars(modoOscuroActivo) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (modoOscuroActivo) {
    ctx.fillStyle = "#ffffff"; // Blanco para modo oscuro
  } else {
    ctx.fillStyle = "#000000"; // Negro para modo claro
  }

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
  drawStars(localStorage.getItem("darkMode") === "true");
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
