import { Scene } from 'phaser';

interface PlayerData {
    character: string;
    curePoints: number;
    resistancePoints: number;
    position: number;
}

export class MainGame extends Scene {
    private playerData: PlayerData;
    private boardSpaces: Phaser.GameObjects.Shape[] = [];
    private spinnerWheel: Phaser.GameObjects.Image;
    private isSpinning: boolean = false;

    constructor ()
    {
        super('Game');
    }

    init(data: any) {
        this.playerData = {
            character: data.character, 
            curePoints: 0, 
            resistancePoints: 0, 
            position: 0,
        };
    }

    preload() {
        this.load.image("gameBoard", "public/assets/Board.png");
        this.load.image("spinnerWheel", "public/assets/Spinner.png");
        this.load.image("pointer", "public/assets/Pointer.png");
        this.load.image("playerToken", `assets/${this.playerData.character}.png`);
    }

    create()
    {
        this.add.image(960, 540, "gameBoard");

        this.initializeBoardSpaces();

        const startPosition = this.boardSpaces[this.playerData.position];
        const playerToken = this.add.image(startPosition.x, startPosition.y, "playerToken").setScale(0.5);

        this.spinnerWheel = this.add.image(800, 600, "spinnerWheel").setInteractive();
        this.spinnerWheel.setScale(0.25);
        const pointer = this.add.image(800, 600, "pointer");
        this.spinnerWheel.setScale(0.25);

        this.spinnerWheel.on("pointerdown", () => {
            if (!this.isSpinning) {
                this.spinWheel(playerToken);
            }
        });

        this.updateScoreDisplay();
    }

    private initializeBoardSpaces() {
        const cols = 12;
        const rows = 6;
        const cellWidth = 50;
        const cellHeight = 50;
        const startX = 100;
        const startY = 100;
    
        const totalSpaces = 2 * (cols + rows) - 4;
    
        for (let i = 0; i < totalSpaces; i++) {
          let x = startX;
          let y = startY;
    
          if (i < cols) {
            // Top edge
            x += i * cellWidth;
          } else if (i < cols + rows - 1) {
            // Right edge
            x += (cols - 1) * cellWidth;
            y += (i - cols + 1) * cellHeight;
          } else if (i < 2 * cols + rows - 2) {
            // Bottom edge
            x += (2 * cols + rows - 3 - i) * cellWidth;
            y += (rows - 1) * cellHeight;
          } else {
            // Left edge
            y += (2 * (cols + rows) - 4 - i) * cellHeight;
          }
    
          const space = this.add.rectangle(x, y, cellWidth - 5, cellHeight - 5, 0x000000, 0).setStrokeStyle(2, 0xffffff);
          this.boardSpaces.push( space );
    
          // Optionally add space number for debugging
          this.add.text(x, y, i.toString(), { fontSize: '12px', color: '#ffffff' }).setOrigin(0.5);
        }
      }

    private updateScoreDisplay() {
        this.children.getAll("type", "text").forEach(child => child.destroy());

        this.add.bitmapText(20, 20, "blockFont", `Cure Points: ${this.playerData.curePoints}`, 18).setScale(1);
        this.add.bitmapText(20, 50, "blockFonts", `Resistance Points: ${this.playerData.resistancePoints}`, 18).setScale(1);
    }

    private spinWheel(playerToken: Phaser.GameObjects.Image) {
        this.isSpinning = true;

        const rounds = Phaser.Math.Between(2, 4);
        const degrees = Phaser.Math.Between(0, 360);
        const totalAngle = rounds * 360 + degrees;

        this.tweens.add({
            targets: this.spinnerWheel,
            angle: totalAngle,
            duration: 3000, 
            ease: "Cubic.easeOut",
            onComplete: () => {
                const result = this.getResultFromAngle(this.spinnerWheel.angle % 360);
                this.movePlayer(result, playerToken);
                this.isSpinning = false;
            },
        });
    }

    private getResultFromAngle(angle: number): number {
        const segmentSize = 360 / 4;
        const index = Math.floor(angle / segmentSize);
        return index + 1;
    }

    private movePlayer(spaces: number, playerToken: Phaser.GameObjects.Image) {
        this.playerData.position = (this.playerData.position + spaces) % this.boardSpaces.length;

        const newPosition = this.boardSpaces[this.playerData.position];

        this.tweens.add({
            targets: playerToken,
            x: newPosition.x,
            y: newPosition.y, 
            duration: 1000, 
            onComplete: () => {
                this.triggerEvent();
            },
        });
    }

    private triggerEvent() {
        const eventType = Phaser.Math.RND.pick(["InfectionCase", "MutationEvent", "AntibioticArsenal", "RandomChallenge"]);
        this.scene.launch("EventScene", { eventType, playerData: this.playerData });
        this.scene.pause();
    }
}
