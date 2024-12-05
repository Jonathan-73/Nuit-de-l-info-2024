import './style.css'
import { BodyMenu, BodyEntry } from "./bodymenu"

// Ts ...
const items: BodyEntry[] = [
    {coordHeight: .1, coordWidth: .2, callBack: () => {console.log("Callback 1")}},
    {coordHeight: .3, coordWidth: .4, callBack: () => {console.log("Callback 2")}},
    {coordHeight: 1, coordWidth: 1, callBack: () => {console.log("Callback 3")}}
]

document.querySelector("#pageContent")?.insertAdjacentElement("beforeend", new BodyMenu(items).getRoot())
