import './style.css'
import { BodyMenu, BodyEntry } from "./bodymenu"

// Ts ...
const items: BodyEntry[] = [
    {heightRatio: .1, widthRatio: .2, callback: () => {console.log("Callback 1")}},
    {heightRatio: .3, widthRatio: .4, callback: () => {console.log("Callback 2")}},
    {heightRatio: 1, widthRatio: 1, callback: () => {console.log("Callback 3")}}
]

document.querySelector("#pageContent")?.insertAdjacentElement("beforeend", new BodyMenu(items).getRoot())
