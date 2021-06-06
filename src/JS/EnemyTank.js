export default class EnemyTank extends PIXI.Sprite {
    
    constructor(data) {
        super(PIXI.Texture.from(data.imageUrl));

        this.anchor.set(0.5);
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
    }
    updatePosition() {

        this.x -= 1.9;
        const random = Math.floor(Math.random() * 2 + 1);

        if (this.x < -50) {
            this.x = 900 + (random * 600);
        };
    };
};