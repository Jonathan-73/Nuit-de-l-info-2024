import '/src/css/style.css'
import {createDivVolumeSlider} from './volumeSlider'
import musique from '../assets/Μουσική/OceanWaves.mp3'
import {BodyMenu} from "./bodymenu"

const token = sessionStorage.getItem("captchaToken");
const tokenHash = sessionStorage.getItem("captchaHash");

if (!token || !tokenHash || btoa(token) !== tokenHash) {
  window.location.href = "/captcha.html";
}

document.querySelector("#pageContent")?.insertAdjacentElement("beforeend", new BodyMenu().getRoot())

let sliderVolume = createDivVolumeSlider();

let oceanWaves = document.createElement("audio");
oceanWaves.src = musique;
oceanWaves.loop = true;
oceanWaves.onloadeddata = () => oceanWaves.play();

sliderVolume.addEventListener('change', ((evt: CustomEvent) => {
    let volume = <number>evt.detail;
    oceanWaves.volume = volume;
}) as EventListener)

document.body.append(sliderVolume);
document.body.appendChild(oceanWaves);
