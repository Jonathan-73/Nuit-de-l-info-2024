import '/src/css/style.css';
import { createDivVolumeSlider } from './volumeSlider';
import musique from '../assets/Μουσική/OceanWaves.mp3';
import { BodyMenu, BodyEntry } from "./bodymenu";
import { AccidentPetrolierApp } from './accident-petrolier';
import { CompositionApp } from './composition';
import { RiverDefenderApp } from './rivierDefender/riverDefender';

// Captcha validation
const token = sessionStorage.getItem("captchaToken");
const tokenHash = sessionStorage.getItem("captchaHash");

if (!token || !tokenHash || btoa(token) !== tokenHash) {
  window.location.href = "/captcha.html";
}

// Create the overlay div
const overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.zIndex = '1000';
document.body.appendChild(overlay);


// Define items
const items: BodyEntry[] = [
  { coordRatio: { heightRatio: .125, widthRatio: .5 }, callback: () => { console.log("Tête") }, accessFromCoordRatio: { heightRatio: .23, widthRatio: .5 } },
  { coordRatio: { heightRatio: .42, widthRatio: .33 }, callback: () => { 
    const app = new AccidentPetrolierApp(overlay);
  }, accessFromCoordRatio: { heightRatio: .3, widthRatio: .4 } },
  { coordRatio: { heightRatio: .38, widthRatio: .46 }, callback: () => { console.log("Poumons") } },
  { coordRatio: { heightRatio: .35, widthRatio: .53 }, callback: () => { new RiverDefenderApp(overlay) } },
  { coordRatio: { heightRatio: .42, widthRatio: 1 - .33 }, callback: () => { console.log("Peau (bras côté droite)") }, accessFromCoordRatio: { heightRatio: .3, widthRatio: .6 } },
  { coordRatio: { heightRatio: .47, widthRatio: 0.45 }, callback: () => { console.log("Foie") } },
  // Uncomment these as needed
  // { coordRatio: { heightRatio: .76, widthRatio: 0.435 }, callback: () => { console.log("Jambe côté gauche") }, accessFromCoordRatio: { heightRatio: .56, widthRatio: 0.435 } },
  { coordRatio: { heightRatio: .76, widthRatio: 1-0.435 }, callback: () => { new CompositionApp(overlay) }, accessFromCoordRatio: { heightRatio: .56, widthRatio: 1-0.435 } },
];

document.querySelector("#bodyMenuContainer")?.insertAdjacentElement("beforeend", new BodyMenu(items).getRoot())

// // Volume slider
let sliderVolume = createDivVolumeSlider();
// let oceanWaves = document.createElement("audio");
// oceanWaves.src = musique;
// oceanWaves.loop = true;
// oceanWaves.onloadeddata = () => oceanWaves.play();

// sliderVolume.addEventListener('change', ((evt: CustomEvent) => {
//   let volume = <number>evt.detail;
//   oceanWaves.volume = volume;
// }) as EventListener);

// document.body.append(sliderVolume);
// document.body.appendChild(oceanWaves);
