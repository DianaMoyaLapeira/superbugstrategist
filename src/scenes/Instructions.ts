import { Scene } from 'phaser'

export default class Instructions extends Scene {
    constructor() {
        super('Instructions');
    }

    preload() {

    }

    create() {

        this.cameras.main.setBackgroundColor('#000000');

        const instructionsList = `
        Welcome to Superbug Strategist!

        - Objective: Prevent the spread of antibiotic-resistant bacteria.
        - Make informed decisions about antibiotic prescriptions.
        - Collect Cure Points by effectively treating infections.
        - Minimize Resistance Points from poor choices.
        - The player with the highest Cure Points and lowest Resistance Points wins.

        Click anywhere to continue.
        `;

        const instructionsText = this.add.bitmapText(700, 300, 'blockFont', instructionsList, 24).setScale(1);
        instructionsText.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('PlayerSelection');
        });
    }
}