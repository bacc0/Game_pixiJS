export default class EnemyAir extends PIXI.Sprite {

    constructor(data) {
        super(PIXI.Texture.from(data.imageUrl));

        this.anchor.set(0.5);
        this.speed = data.speed;
        this.x = data.x;
        this.y = data.y;
        this.width = 110;
        this.height = 77;
        this.rotation = -0.04;
    }
    updatePosition() {

        this.x -= this.speed;
        const random = Math.floor(Math.random() * 3 + 1);

        if (this.x < -1200) {
            this.x = 1200 * random;
        };
    };
};