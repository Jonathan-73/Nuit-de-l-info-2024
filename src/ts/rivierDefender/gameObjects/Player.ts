import { Physics, Scene } from "phaser";

export class Player extends Physics.Arcade.Image {
    constructor(scene: Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
    }

    update(mouseX: number) {
        this.x = Math.min(Math.max(70, mouseX), this.scene.scale.width - 70);
    }
}