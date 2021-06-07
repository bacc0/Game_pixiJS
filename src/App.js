import * as PIXI from "pixi.js";

import Hero from './scripts/Hero';
import FireTank from './scripts/FireTank';
import EnemyAir from './scripts/EnemyAir';
import EndScreen from './scripts/EndScreen';
import EnemyTank from './scripts/EnemyTank';
import { creatBackground } from './scripts/Background';
import { score, updateScore, intersectHandler } from './scripts/__intersect';

export let Game;

let gameOver,
    scoreText,
    heroExplosion;
    
let enemies = [];

export let hero ;
export let keys = {};
export let tanks = [];
export let fireArr = [];
export let imagesBG = [];


// ---------------------------------------------------------[    INITIALIZING THE GAME    ]---------
window.onload = () => {
        Game = new PIXI.Application({
            width: 1140,
            height: 540,
            backgroundColor: 0x60B6FF,
        });
        document.body.appendChild(Game.view);
    
    // --------------------------------------(Adding ELEMENTS)   
        creatBackground();
        createGameOver();
        createHero();
        createEnemyAir();
        createTankFire();
        createEnemyTank();
        createScore();
    
        Game.ticker.add(gameLoop);
    
    // --------------------------------------(Add EVENT LISTENER)
        window.addEventListener('keydown', keysDown);
        window.addEventListener('keyup', keysUp);
};
const keysDown = e => { keys[e.keyCode] = true; };
const keysUp = e => { keys[e.keyCode] = false; };



// -----------------------------------------------------------[     GAME LOOP     ]-----------------
export const gameLoop = () => {

    hero.updatePosition();

    imagesBG.forEach( im => {
        im.updateBG();
    });

    tanks.forEach( ta => {
        ta.updatePosition();
    });

    enemies.forEach( en => {
        en.updatePosition();
        intersectHandler(hero, en, heroExplosion, gameOver);
    });

    fireArr.forEach( fi => {
        fi.updatePosition();
        intersectHandler(hero, fi, heroExplosion, gameOver);
    });

    scoreText.text = `Score: ${(score / 1000).toFixed(1)}00 km`;
    updateScore(score);
};



// --------------------------------------(Create HERO)
const createHero = () => {

    hero = new Hero({ imageUrl: 'src/assets/sprites/player.png' });
    Game.stage.addChild(hero);

    heroExplosion = new Hero({
        imageUrl: 'src/assets/sprites/explosion.png',
        width: 150,
        height: 130,
    });
    Game.stage.addChild(heroExplosion);
    heroExplosion.visible = false;
};

// --------------------------------------(Create TANK) 
const createEnemyTank = () => {

    let positionX = 680;
    for (let i = 0; i <= 2; i++) {
        const tank = new EnemyTank({
            x: positionX,
            imageUrl: 'src/assets/sprites/tank.png',
        });
        Game.stage.addChild(tank);
        tanks.push(tank);

        positionX += 200;
    };
};

// --------------------------------------(Create TANK FIRE)
const createTankFire = () => {

    for (let i = 1; i <= 6; i++) {
        const fire = new FireTank( 'src/assets/sprites/fire.png' );
        Game.stage.addChild(fire);
        fireArr.push(fire);
    };
};

// --------------------------------------(Create AIRPLANE)
let tempY = 380;
let tempX = 1200;

const createEnemyAir = () => {

    for (let i = 1; i <= 6; i++) {
        const enemy = new EnemyAir({
            x: tempX,
            y: tempY,
            imageUrl: 'src/assets/sprites/enemy.png',
        });
        Game.stage.addChild(enemy);
        enemies.push(enemy);
        
        tempY -= 70;
        tempX += 500;
    };
};

// --------------------------------------(Create SCORE)
const createScore = () => {
    scoreText = new PIXI.Text('Score: 0');
    scoreText.style = new PIXI.TextStyle({ fill: 0xFFFFFF, fontFamily: 'Goldman', fontSize: 30 });
    scoreText.x = 10;
    Game.stage.addChild(scoreText);
};

// --------------------------------------(Create GAME OVER Screen)
const createGameOver = () => {
    gameOver = new EndScreen( 'src/assets/sprites/game_over.png' );
    Game.stage.addChild(gameOver);
    gameOver.visible = false;
};


