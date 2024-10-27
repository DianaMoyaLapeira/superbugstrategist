import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene');
    }

    preload() {
        // load assets once theyre ready
        this.load.image("logo", "public/assets/logo.png");
        this.load.image("bg", "public/assets/bg.png");
    }

    create() {

        const background = this.add.image(960, 540, 'bg').setScale(1);

        const titleBg = this.add.rectangle(960, 195, 800, 95, 0xffffff).setStrokeStyle(8, 0x1a5b5b);
        const title = this.add.bitmapText(960, 200, 'blockFont', 'Superbug Strategist', 64).setScale(1);
        title.setOrigin(0.5);
        title.setTint(0x1a5b5b);

        const logo = this.add.image(960, 550, "logo").setScale(0.5);

        const startBg = this.add.rectangle(960, 895, 350, 70, 0xffffff).setStrokeStyle(8, 0x1a5b5b);
        const startButton = this.add.bitmapText(960, 900, 'blockFont', 'Start Game', 48).setScale(1);
        startButton.setTint(0x1a5b5b);
        startButton.setDropShadow(1, 1, 0xffffff);

        startButton.setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('Instructions');
        });
    }
}