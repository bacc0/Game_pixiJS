import * as PIXI from "pixi.js";

import { Game, imagesBG, gameLoop } from '../App';

export default class Background extends PIXI.Sprite {

    constructor(data) {
        super();
        this.texture = data.textureBG;
        this.speed = data.speedBG;
        this.width = 1140;
        this.height = 540;
    };
    updateBG() {
        this.x = (this.x - this.speed);
        if (this.x <= -1140) {
            this.x = 1140;
        };
    };
};



// --------------------------------------(Load BACKGROUND IMAGES)
export const creatBackground = () => {

Game.loader
        .add('oneBG', 'src/assets/sprites/backBG.png')
        .add('twoBG', 'src/assets/sprites/mid2BG.png')
        .add('threeBG', 'src/assets/sprites/midBG.png')
        .add('fourBG', 'src/assets/sprites/frontBG.png');
    Game.loader.onComplete.add(initLevel);
    Game.loader.load();
};


const initLevel = () => {
    const oneBG = createBG(Game.loader.resources['oneBG'].texture);
    const twoBG = createBG(Game.loader.resources['twoBG'].texture);
    const threeBG = createBG(Game.loader.resources['threeBG'].texture);
    const fourBG = createBG(Game.loader.resources['fourBG'].texture);

    Game.ticker.add(gameLoop);
};

// --------------------------------------(Create BACKGROUND)
let count = 0;

const createBG = (texture) => {
    let newBG;

    let speed = count === 0
                    ? 0.5
                    : count === 1
                        ? 1.5
                        : count === 2
                            ? 3
                            : 6;
    newBG = new Background({ textureBG: texture, speedBG: speed });
    newBG.position.set(0, 0);
    Game.stage.addChild(newBG);
    imagesBG.push(newBG);

    newBG = new Background({ textureBG: texture, speedBG: speed });
    newBG.position.set(1140, 0);
    Game.stage.addChild(newBG);
    imagesBG.push(newBG);

    count++;

    return newBG;
};