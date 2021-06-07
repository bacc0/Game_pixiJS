import * as PIXI from "pixi.js";
export default class EndScreen extends PIXI.Sprite {

	constructor(imageUrl) {
		super(PIXI.Texture.from(imageUrl));

		this.anchor.set(0.5);
		this.x = 570;
		this.y = 270;
	};
};

