import "/src/css/style.css";

import { createFishingGameComponent, startGame } from "./fishing";
const token = sessionStorage.getItem("captchaToken");
const tokenHash = sessionStorage.getItem("captchaHash");

if (!token || !tokenHash || btoa(token) !== tokenHash) {
  window.location.href = "/captcha.html";
}

// Possible example of an activiry component
document.addEventListener("DOMContentLoaded", () => {
  const appRoot = document.getElementById("app");
  if (appRoot) {
    const gameComponent = createFishingGameComponent();
    appRoot.appendChild(gameComponent);
    startGame();
  } else {
    console.error("#app element not found.");
  }
});

// Ts ...
