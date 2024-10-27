import Phaser from 'phaser';

interface EventData {
    eventType: string; 
    playerData: any;
}

export default class EventScene extends Phaser.Scene {
    private eventType: string; 
    private playerData: any;

    constructor() {
        super("EventScene");
    }

    init(data: EventData) {
        this.eventType = data.eventType; 
        this.playerData = data.playerData;
    }

    preload() {
        // get assets for specific events when I have them
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);

        switch (this.eventType) {
            case "InfectionCase":
                this.displayInfection();
                break;
            case "MutationEvent":
                this.mutation();
                break;
            case "RandomChallenge":
                this.randomChallenge();
                break;
            case "AntibioticArsenal":
                this.antibioticArsenal();
                break;
            default: 
                this.close();
        }
    }

    private displayInfection() {
       
        const description = this.add.text(400, 350, 'A patient presents with symptoms...', { fontSize: '18px', color: '#ffffff', wordWrap: { width: 700 } });
        description.setOrigin(0.5);

        // Display antibiotic choices
        const antibiotics = ['Penicillin', 'Macrolide', 'Fluoroquinolone'];
        antibiotics.forEach((antibiotic, index) => {
        const choiceButton = this.add.text(400, 400 + index * 50, antibiotic, { fontSize: '24px', color: '#ffffff', backgroundColor: '#0000ff' });
        choiceButton.setOrigin(0.5);
        choiceButton.setInteractive();
        choiceButton.on('pointerdown', () => {
            this.evaluateChoice(antibiotic);
        });
        });
    }

    private evaluateChoice(antibiotic: string) {
        // Simplified evaluation logic
        let success = Phaser.Math.Between(0, 1) === 1;
        if (success) {
          this.playerData.curePoints += 10;
          this.showOutcome('Treatment Successful!', 'You earned 10 Cure Points.');
        } else {
          this.playerData.resistancePoints += 5;
          this.showOutcome('Treatment Failed!', 'You gained 5 Resistance Points.');
        }
    }

    private showOutcome(title: string, message: string) {
        // Clear previous content
        this.children.removeAll();
    
        // Display outcome
        this.add.text(400, 250, title, { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);
        this.add.text(400, 300, message, { fontSize: '24px', color: '#ffffff' }).setOrigin(0.5);
    
        // Add "Continue" button
        const continueButton = this.add.text(400, 400, 'Continue', { fontSize: '24px', color: '#ffffff', backgroundColor: '#00ff00' });
        continueButton.setOrigin(0.5);
        continueButton.setInteractive();
        continueButton.on('pointerdown', () => {
          this.close();
        });
    }

    private mutation() {
        this.showOutcome('Mutation Event!', 'A mutation has occurred.');
    }

    private randomChallenge() {
        this.showOutcome('Random Challenge Event!', 'A random challenge has occurred.');
    }

    private antibioticArsenal() {
        this.showOutcome('Antibiotic Arsenal!', 'An antibiotic has occurred.');
    }

    private close() {
        this.scene.resume("Game");
        this.scene.stop();
    }
}