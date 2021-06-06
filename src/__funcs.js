// var audio = new Audio('src/assets/bomb_explosion.mp3');


export const intersectHandler = (a, b, heroExplosion, gameOver) => {

    if (IntersectObjects(a, b)) {
        heroExplosion.y = a.y;
        heroExplosion.x = a.x - 30;

        b.visible = false;
        a.visible = false;

        heroExplosion.visible = true;
        gameOver.visible = true;
        // audio.play();
        setTimeout(() => {
            a.visible = true;
            b.visible = true;

            heroExplosion.visible = false;
            gameOver.visible = false;

        }, 666);
    };
};

export const IntersectObjects = (a, b) => {

    let aBox = a.getBounds();
    let bBox = b.getBounds();

    return aBox.x + 70 > bBox.x && aBox.x < bBox.x + 70 &&
        aBox.y + 40 > bBox.y && aBox.y < bBox.y + 40;
};


