import './style.css'
import {BodyMenu} from "./bodymenu"

// Ts ...

document.querySelector("#pageContent")?.insertAdjacentElement("beforeend", new BodyMenu().getRoot())
