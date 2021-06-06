import { tanks } from '../index';

export default class FireTank extends PIXI.Sprite {

    constructor(data) {
        super(PIXI.Texture.from(data.imageUrl));

        this.anchor.set(0.5);
        this.x = data.x;
        this.y = data.y;
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
