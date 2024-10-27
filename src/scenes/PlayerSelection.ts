import Phaser from 'phaser';

export default class PlayerSelection extends Phaser.Scene {
    private selectedCharacter: string = 'scientist1';

    constructor() {
        super('PlayerSelection');
    }

    preload() {
        // load character choices when I have them 
        this.load.image("character1", "public/assets/Character1.png");
        this.load.image("character2", "public/assets/Character2.png");
        this.load.image("character3", "public/assets/Character3.png");
    }

    create() {
        this.cameras.main.setBackgroundColor('#1d212d');

        const title = this.add.bitmapText(400, 50, "blockFont", "Select Your Character!", 32).setScale(1);
        
        const characters = ["character1", "character2", "character3"];
        characters.forEach((character, index) => {
            const x = 200 + index * 200;
            const y = 300;
            const characterImage = this.add.image(x, y, character);
            characterImage.setInteractive();
            characterImage.on("pointerdown", () => {
                this.selectedCharacter = character;
                this.add.rectangle(x, y + 100, 100, 10, 0x00ff00);
            });
        });

        const confirmB = this.add.bitmapText(400, 550, "blockFont", "Confirm", 24).setScale(1);
        confirmB.setInteractive();
        confirmB.on("pointerdown", () => {
            this.scene.start("Game", { character: this.selectedCharacter });
        });
    }
}