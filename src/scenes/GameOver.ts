import { Scene } from 'phaser';

interface EndData {
    playerData: any;
}

export class GameOver extends Scene {
    private playerData: any;

    constructor ()
    {
        super('GameOver');
    }

    init(data: EndData) {
        this.playerData = data.playerData;
    }

    create ()
    {
        this.add.bitmapText(400, 200, "blockFont", "Game Over!", 48).setScale(1);

        const finalScore = `Cure Points: ${this.playerData.curePoints}\nResistance Points: ${this.playerData.resistancePoints}`;
        this.add.bitmapText(400, 300, "blockFont", finalScore, 32).setScale(1);

        const playAgainB = this.add.bitmapText(400, 400, "blockFont", "Play Again", 24).setScale(1);
        playAgainB.setInteractive();
        playAgainB.on("pointerdown", () => {
            this.scene.start("StartScene");
        });
    }
}
