import { Boot } from './scenes/Boot';
import { MainGame }  from './scenes/MainGame';
import { GameOver } from './scenes/GameOver';
import PlayerSelection from './scenes/PlayerSelection';
import { Preloader } from './scenes/Preloader';
import StartScene from './scenes/StartScene';
import Instructions from './scenes/Instructions';
import EventScene from './scenes/Event';

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,
    roundPixels: false,
    antialias: false,
    zoom: 1,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        StartScene,
        Instructions,
        PlayerSelection,
        MainGame,
        EventScene,
        GameOver
    ], 
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        },
    },
};

export default new Game(config);
