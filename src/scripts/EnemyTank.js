import * as PIXI from "pixi.js";
export default class EnemyTank extends PIXI.Sprite {

    constructor(data) {
        super(PIXI.Texture.from(data.imageUrl));

        this.anchor.set(0.5);
        this.x = data.x;
        this.y = 454;
        this.width = 120;
        this.height = 40;
    }
    updatePosition() {

        this.x -= 1.9;
        const random = Math.floor(Math.random() * 2 + 1);

        if (this.x < -50) {
            this.x = 900 + (random * 600);
        };
    };
};