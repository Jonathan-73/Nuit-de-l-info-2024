import { Scene } from "phaser";

export class LoadScene extends Scene {

    constructor() {
        super("LoadScene");
    }

    preload() {
        this.load.image('player', '/assets/riverDefender/basket.png');
        this.load.image('fallingObject', '/assets/riverDefender/microplastic.png');
        this.load.image('playButton', '/assets/riverDefender/playBtn.png');
        // Load a water animated spritesheet
        this.load.spritesheet('water', '/assets/riverDefender/waterSpriteSheet.png', {
            frameWidth: 500,
            frameHeight: 500
        });
        // EndScreen preloading
        this.load.image('returnToMenu', '/assets/riverDefender/return.png');
        this.load.image('thanks', '/assets/riverDefender/thanks.png');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);

        const playButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'playButton');
        playButton.setInteractive();

        playButton.on('pointerdown', () => {
            this.tweens.add({
                targets: playButton,
                ease: 'Power1',
                duration: 150,
                yoyo: true,
                repeat: 0,
                scaleX: 0.6,
                onComplete: () => {
                    this.scene.start('MainScene');
                }
            });
        });
    }
}