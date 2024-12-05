
import { BodyMenu } from "./bodymenu";
import { GameContent } from "./gameContent";

const bodyMenu = new BodyMenu();
const gameContent = new GameContent();
document.body.appendChild(bodyMenu.getRoot());
document.body.appendChild(gameContent.getGameContainer());
