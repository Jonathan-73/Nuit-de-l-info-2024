import "/src/css/style.css";

import { createFishingGameComponent, startGame } from "./fishing";
const token = sessionStorage.getItem("captchaToken");
const tokenHash = sessionStorage.getItem("captchaHash");

if (!token || !tokenHash || btoa(token) !== tokenHash) {
  window.location.href = "/captcha.html";
}
// Ts ...
