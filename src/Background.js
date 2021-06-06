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