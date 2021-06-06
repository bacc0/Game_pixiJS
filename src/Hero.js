import { keys, hero, game } from './index';

export default class Hero extends PIXI.Sprite {
    constructor(data) {
        super(PIXI.Texture.from(data.imageUrl));

        this.anchor.set(0.5);
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
    };
    updatePosition() {
        if (keys['38'] && hero.y !== 35) {
            hero.y -= 5;
        };
        if (keys['40'] && hero.y !== game.view.height - 140) {
            hero.y += 5;
        };
        if (keys['37'] && hero.x > 50) {
            hero.x -= 5;
        };
        if (keys['39'] && hero.x < 1070) {
            hero.x += 5;
        };
    };
};