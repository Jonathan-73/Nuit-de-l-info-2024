import { Scene } from "phaser";
import { Player } from "../gameObjects/Player";
import { FallingObject } from "../gameObjects/FallingObject";
const TARGET_POINTS = 50;
export class MainScene extends Scene {
    player!: Player;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    points: number = 0;
    fallingObjects!: Phaser.Physics.Arcade.Group;

    constructor() {
        super("MainScene");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        this.anims.create({
            key: 'waterAnim',
            frames: this.anims.generateFrameNumbers('water', { start: 0, end: 50 }),
            frameRate: 10,
            repeat: -1
        });
        const water = this.add.sprite(this.scale.width / 2, this.scale.height, 'water');
        water.setOrigin(0.5, 1); // Set the origin to the bottom center
        water.setScale(4, 0.5)
        water.anims.play('waterAnim');

        // Add the player to the scene and enable physics
        this.player = new Player(this, this.scale.width / 2, this.scale.height - 150, 'player');
        this.physics.add.existing(this.player);
        this.player.setSize(this.player.width, this.player.height);
        this.player.setOffset(0, 50); // Move the hitbox down by 10px (make it lower on the top)

        // Disable gravity for the player so it won't fall
        // @ts-ignore
        this.player.body.allowGravity = false;

        // Create a physics-enabled group for falling objects
        this.fallingObjects = this.physics.add.group({
            classType: FallingObject,
            runChildUpdate: true
        });

        // Spawn a new falling object every second
        this.time.addEvent({
            delay: 500,
            callback: this.spawnFallingObject,
            callbackScope: this,
            loop: true
        });

        // Add collision detection between the player and falling objects
        // @ts-ignore
        this.physics.add.collider(this.player, this.fallingObjects, this.catchObject, undefined, this);

        // Add overlap check for falling objects hitting the lower bound
        this.physics.world.on('worldstep', this.checkLowerBoundCollision, this);
    }


    update() {
        // Update the player with input
        this.player.update(this.input.activePointer.x);

        // Remove previous points
        this.children.each((child) => {
            if (child instanceof Phaser.GameObjects.Text) {
                child.destroy();
            }
        });
        // Display the points
        this.add.text(10, 10, `${this.points.toString().padStart(2, '0')}/${TARGET_POINTS}`, {
            fontSize: '40px',
            color: '#ffffff',
        });
    }

    spawnFallingObject() {
        // Spawn a new FallingObject at a random position
        const x = Phaser.Math.Between(50, this.scale.width - 50);
        const fallingObject = this.fallingObjects.get(x, 0, 'fallingObject') as FallingObject;

        if (fallingObject) {

            fallingObject.setActive(true);
            fallingObject.setVisible(true);
            // Acceleration Setup
            fallingObject.setVelocityY(250 + this.points * 10);
            fallingObject.setAccelerationY(150);

            // Rotation setup
            fallingObject.setAngle(Phaser.Math.Between(0, 360));
            fallingObject.setAngularVelocity(Phaser.Math.Between(-200, 200));
        }
    }


    catchObject(player: Player, object: FallingObject) {
        // Destroy the falling object and increment points
        object.destroy();
        this.points += 1;

        // Prevent the player from moving after collision
        if (player.body) {
            player.body.velocity.y = 0;
        }

        // player giggle
        this.tweens.add({
            targets: player,
            ease: 'Power1',
            duration: 250,
            yoyo: true,
            repeat: 0,
            angle: { from: -15, to: 15 },
            onComplete: () => {
                // reset the angle to 0
                this.tweens.add({
                    targets: player,
                    angle: 0,
                    ease: 'Power1',
                    duration: 100
                });
                // Increase its Y position
                this.tweens.add({
                    targets: player,
                    y: player.y - 10,
                    ease: 'Power1',
                    duration: 100,
                    yoyo: true,
                    repeat: 0,
                    onComplete: () => {
                        // Reset the Y position
                        this.tweens.add({
                            targets: player,
                            y: player.y + 1,
                            ease: 'Power1',
                            duration: 100
                        });
                    }
                });

                if (this.points >= TARGET_POINTS) {
                    this.scene.start('EndScene');
                }
            }
        });
    }


    checkLowerBoundCollision() {
        // @ts-ignore
        this.fallingObjects.children.each((fallingObject: FallingObject) => {
            if (fallingObject.active && fallingObject.y >= this.scale.height - fallingObject.height / 2) {
                this.points = Math.max(0, this.points - 1);
                fallingObject.destroy();
            }
        });
    }
}
