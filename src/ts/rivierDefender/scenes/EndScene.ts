import { Scene } from "phaser";

export class EndScene extends Scene {

    constructor() {
        super("EndScene");
    }

    create() {
        const text = this.add.image(this.scale.width / 2, this.scale.height / 4, 'thanks');
        text.setOrigin(0.5, 0.5);


        const quitButton = this.add.image(this.scale.width / 2, 3*this.scale.height / 6, 'returnToMenu');
        quitButton.setInteractive();


        quitButton.on('pointerdown', () => {
            this.tweens.add({
                targets: quitButton,
                ease: 'Power1',
                duration: 150,
                yoyo: true,
                repeat: 0,
                scaleX: 0.6,
                onComplete: () => {
                    //@ts-ignore
                    window.quitNoah();
                }
            });
        });
    }
}