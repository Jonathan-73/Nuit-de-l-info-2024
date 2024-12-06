import { Game } from "phaser";
import { MainScene } from "./scenes/MainScene.ts";
import {LoadScene} from "./scenes/LoadScene.ts";
import {EndScene} from "./scenes/EndScene.ts";
import { App } from "../app.ts";

const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    backgroundColor: "#1c172e",
    pixelArt: true,
    roundPixel: false,
    // current context width
    width: parent.innerWidth - 50,
    // current context height
    height: parent.innerHeight - 50,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        LoadScene,
        MainScene,
        EndScene
    ]
};

// Used by Phaser

export class RiverDefenderApp extends App {
    
    constructor(overlay: HTMLElement) {
        super(overlay);
        this.elem.id = "phaser-container";
        // @ts-ignore
        window.quitNoah = () => { this.done(); };

        // @ts-ignore
        const game = new Game(config);
    }

}
