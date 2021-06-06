
export default class EndScreen extends PIXI.Sprite {
	constructor(data) {
		super(PIXI.Texture.from(data.imageUrl));

		this.anchor.set(0.5);
		this.x = 570;
		this.y = 270;
	};
};

