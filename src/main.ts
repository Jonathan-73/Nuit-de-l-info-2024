import './style.css'
import { BodyMenu, BodyEntry } from "./bodymenu"

// Ts ...
const items: BodyEntry[] = [
    {
        widthRatio: 0.5,
        heightRatio: 0.5,
        callback: () => console.log('Bouton 1'),
        tooltip: "Je suis une bulle de bande dessinée !",
    },
];

document.querySelector("#pageContent")?.insertAdjacentElement("beforeend", new BodyMenu(items).getRoot())
