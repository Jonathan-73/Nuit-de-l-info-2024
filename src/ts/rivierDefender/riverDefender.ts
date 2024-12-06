import { Game } from "phaser";
import { MainScene } from "./scenes/MainScene.ts";
import {LoadScene} from "./scenes/LoadScene.ts";
import {EndScene} from "./scenes/EndScene.ts";

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
// @ts-ignore
const game = new Game(config);

export function createComponent() {
    const element = document.createElement('div');
    element.id = 'phaser-container';
    return element;
}