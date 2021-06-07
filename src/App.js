import * as PIXI from "pixi.js";

import Hero from './JS/Hero';
import FireTank from './JS/FireTank';
import EnemyAir from './JS/EnemyAir';
import EndScreen from './JS/EndScreen';
import EnemyTank from './JS/EnemyTank';
import { creatBackground } from './JS/Background';
import { intersectHandler, score, updateScore } from './JS/__intersect';

export let Game;

let tank,
    enemy,
    gameOver,
    scoreText,
    heroExplosion;

let enemies = [];

export let hero;
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
    
    // --------------------------------------(Adding GAME ELEMENTS)   
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

    console.log(Game.loader.resources.fourBG.url)
    hero = new Hero({
        x: Game.view.width / 6,
        y: Game.view.height / 2,
        imageUrl: 'src/assets/img/player.png',
        width: 120,
        height: 70
    });
    Game.stage.addChild(hero);

    heroExplosion = new Hero({
        x: 0,
        y: 0,
        imageUrl: 'src/assets/img/explosion.png',
        width: 150,
        height: 130
    });
    Game.stage.addChild(heroExplosion);
    heroExplosion.rotation = 0.2;
    heroExplosion.visible = false;
};

// --------------------------------------(Create TANK) 
const createEnemyTank = () => {

    let positionX = 680;
    for (let i = 0; i <= 2; i++) {
        tank = new EnemyTank({
            x: positionX,
            y: 454,
            imageUrl: 'src/assets/img/tank.png',
            width: 120,
            height: 40
        });
        Game.stage.addChild(tank);
        positionX += 200;
        tanks.push(tank);
    };
};

// --------------------------------------(Create TANK FIRE)
const createTankFire = () => {

    for (let i = 1; i <= 6; i++) {
        const fire = new FireTank({
            x: 800,
            y: 450,
            imageUrl: 'src/assets/img/fire.png',
        });
        fire.rotation = 3.6;
        fire.width = 26;
        fire.height = 10;
        Game.stage.addChild(fire);
        fireArr.push(fire);
    };
};

// --------------------------------------(Create AIRPLANE)
let tempY = 380;
let tempX = 1200;

const createEnemyAir = () => {

    for (let i = 1; i <= 6; i++) {
        enemy = new EnemyAir({
            x: tempX,
            y: tempY,
            imageUrl: 'src/assets/img/enemy.png',
            speed: 7
        });
        tempY -= 70;
        tempX += 500;
        Game.stage.addChild(enemy);
        enemies.push(enemy);
    };
};

// --------------------------------------(Create SCORE)
const createScore = () => {
    scoreText = new PIXI.Text('Score: 0');

    scoreText.style = new PIXI.TextStyle({
        fill: 0xFFFFFF,
        fontFamily: 'Goldman',
        fontSize: 30
    });
    scoreText.x = 10;
    Game.stage.addChild(scoreText);
};

// --------------------------------------(Create GAME OVER Screen)
const createGameOver = () => {

    gameOver = new EndScreen({
        x: 100,
        y: 0,
        imageUrl: 'src/assets/img/game_over.png'
    });
    Game.stage.addChild(gameOver);
    gameOver.visible = false;
};
