import '/src/css/style.css'
import { createDivVolumeSlider } from './volumeSlider'
import {createCompositionDiv } from './composition'
import musique from '../assets/Μουσική/OceanWaves.mp3'
import { BodyMenu, BodyEntry } from "./bodymenu"
import { AccidentPetrolierApp } from './accident-petrolier';

const token = sessionStorage.getItem("captchaToken");
const tokenHash = sessionStorage.getItem("captchaHash");

if (!token || !tokenHash || btoa(token) !== tokenHash) {
  window.location.href = "/captcha.html";
}

const items: BodyEntry[] = [
  { coordRatio: { heightRatio: .125, widthRatio: .5 }, callback: () => { console.log("Tête") }, accessFromCoordRatio: { heightRatio: .23, widthRatio: .5 } },
  { coordRatio: { heightRatio: .42, widthRatio: .33 }, callback: () => { 
    let element: HTMLElement;
    let app = new AccidentPetrolierApp(document.body, () => element.remove());
    element = app.elem;
  }, accessFromCoordRatio: { heightRatio: .3, widthRatio: .4 } },
  { coordRatio: { heightRatio: .38, widthRatio: .46 }, callback: () => { console.log("Poumons") } },
  { coordRatio: { heightRatio: .35, widthRatio: .53 }, callback: () => { console.log("Coeur") } },
  { coordRatio: { heightRatio: .42, widthRatio: 1 - .33 }, callback: () => { console.log("Peau (bras côté droite)") }, accessFromCoordRatio: { heightRatio: .3, widthRatio: .6 } },
  { coordRatio: { heightRatio: .47, widthRatio: 0.45 }, callback: () => { console.log("Foie") } },
  // { coordRatio: { heightRatio: .76, widthRatio: 0.435 }, callback: () => { console.log("Jambe côté gauche") }, accessFromCoordRatio: { heightRatio: .56, widthRatio: 0.435 } },
  // { coordRatio: { heightRatio: .76, widthRatio: 1-0.435 }, callback: () => { console.log("Jambe côté droite") }, accessFromCoordRatio: { heightRatio: .56, widthRatio: 1-0.435 } },
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
