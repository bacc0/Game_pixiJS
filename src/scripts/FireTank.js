import * as PIXI from "pixi.js";

import { tanks } from '../App';

export default class FireTank extends PIXI.Sprite {

    constructor(imageUrl) {
        super(PIXI.Texture.from(imageUrl));

        this.anchor.set(0.5);
        this.x = 800;
        this.y = 450;

        this.width = 26;
        this.height = 10;

        this.rotation = 3.6;
    };
    updatePosition() {
        const random = Math.floor(Math.random() * 3);
        this.x -= 3;
        this.y -= 2;

        if (this.x < -3800) {
            this.x = tanks[random].x;
            this.y = tanks[random].y;
        };
    };
};
