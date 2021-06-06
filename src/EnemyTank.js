export default class EnemyTank extends PIXI.Sprite {
    constructor(data) {
        super(PIXI.Texture.from(data.imageUrl));

        this.anchor.set(0.5);
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
    }
};