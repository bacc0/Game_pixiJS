export let score = 0;

export const updateScore = (val) => {
    return score = val + 1;
};

export const intersectHandler = (a, b, heroExplosion, gameOver) => {

     const intersectObjects = (a, b) => {

        let aBox = a.getBounds();
        let bBox = b.getBounds();
    
        return aBox.x + 70 > bBox.x && aBox.x < bBox.x + 70 &&
            aBox.y + 40 > bBox.y && aBox.y < bBox.y + 40;
    };

    if ( intersectObjects(a, b) ) {
        heroExplosion.y = a.y;
        heroExplosion.x = a.x - 30;

        a.visible = false;
        b.x = -200;

        heroExplosion.visible = true;
        gameOver.visible = true;
        // audio.play();

        score = 0;
        return setTimeout(() => {
                a.visible = true;
                // b.visible = true;
                heroExplosion.visible = false;
                gameOver.visible = false;

        }, 666);
    };
};

 




