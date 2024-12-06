import '/src/css/style.css'
import {createDivVolumeSlider} from './volumeSlider'
import musique from '../assets/Μουσική/OceanWaves.mp3'
import { BodyMenu, BodyEntry } from "./bodymenu"

const token = sessionStorage.getItem("captchaToken");
const tokenHash = sessionStorage.getItem("captchaHash");

if (!token || !tokenHash || btoa(token) !== tokenHash) {
  window.location.href = "/captcha.html";
}

const items: BodyEntry[] = [
  { coordRatio: { heightRatio: .1, widthRatio: .2 }, callback: () => { console.log("Callback 1") } },
  { coordRatio: { heightRatio: .3, widthRatio: .4 }, callback: () => { console.log("Callback 2") } },
  { coordRatio: { heightRatio: 1, widthRatio: 1 }, callback: () => { console.log("Callback 3") }, accessFromCoordRatio: { heightRatio: .8, widthRatio: 1 } }
]

document.querySelector("#pageContent")?.insertAdjacentElement("beforeend", new BodyMenu(items).getRoot())

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
