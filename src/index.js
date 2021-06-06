import Hero from './Hero';
import FireTank from './FireTank';
import EndScreen from './EndScreen';
import EnemyAir from './EnemyAir';
import EnemyTank from './EnemyTank';
import Background from './Background';

import { intersectHandler } from './__funcs';


let game;

let bgX = 0;
let bgSpeed = 1;

let BG_back, BG_middle_1, BG_middle_2, BG_front;
let tank, tiling, hero, gameOver, heroExplosion, enemy, createEnemy, fire;

let keys = {};
let tanks = [];
let enemies = [];
let fireArr = [];
let imagesBG = [];

export { tanks, game, fireArr, keys, hero };


window.onload = function () { initialize() };

const initialize = () => {

    game = new PIXI.Application({
        width: 1140,
        height: 540,
        backgroundColor: 0x60B6FF
    });

    document.querySelector('#gameDiv').appendChild(game.view);
    game.stage.interactive = true;

    game.loader
        .add('BG_front', 'src/assets/frontBG.png')
        .add('BG_middle_2', 'src/assets/midBG.png')
        .add('BG_middle_1', 'src/assets/mid2BG.png')
        .add('BG_back', 'src/assets/backBG.png');
    game.loader.onComplete.add(initLevel);
    game.loader.load();

    createGameOver();

    createHero();

    createEnemyAir();
    

    createEnemyTank();

    createTankFire();

    game.ticker.add(gameLoop);

    window.addEventListener('keydown', keysDown);
    window.addEventListener('keyup', keysUp);
};


const keysDown = (e) => {
    keys[e.keyCode] = true;
  
};
const keysUp = (e) => {
    keys[e.keyCode] = false;
};


const gameLoop = () => {
    hero.updatePosition();

    imagesBG.forEach(img => {
        img.updateBG()
    });
    enemies.forEach(enemy => {
        enemy.updatePosition();
        intersectHandler(hero, enemy, heroExplosion, gameOver);
    });
    fireArr.forEach(fire => {
        fire.updatePosition();
        intersectHandler(hero, fire, heroExplosion, gameOver);
    });
};


const initLevel = () => {
    BG_back = createBG(game.loader.resources['BG_back'].texture);
    BG_middle_1 = createBG(game.loader.resources['BG_middle_1'].texture);
    BG_middle_2 = createBG(game.loader.resources['BG_middle_2'].texture);
    BG_front = createBG(game.loader.resources['BG_front'].texture);

    game.ticker.add(gameLoop);
};


let count = 0;
const createBG = (texture) => {

    let speed = count === 0
        ? 0.5
        : count === 1
            ? 1.5
            : count === 2
                ? 3
                : 6;
    tiling = new Background({ textureBG: texture, speedBG: speed });
    tiling.position.set(0, 0);
    game.stage.addChild(tiling);
    imagesBG.push(tiling);

    tiling = new Background({ textureBG: texture, speedBG: speed });
    tiling.position.set(1140, 0);
    game.stage.addChild(tiling);
    imagesBG.push(tiling);

    count++;

    return tiling;
};


const createHero = () => {
    hero = new Hero({
        x: game.view.width / 6,
        y: game.view.height / 2,
        imageUrl: 'src/assets/player.png',
        width: 120,
        height: 70
    });
    game.stage.addChild(hero);

    heroExplosion = new Hero({
        x: 0,
        y: 0,
        imageUrl: 'src/assets/explosion.png',
        width: 150,
        height: 130
    });
    game.stage.addChild(heroExplosion);
    heroExplosion.scale.x = 0.5;
    heroExplosion.scale.y = 0.4;
    heroExplosion.rotation = 0.2;
    heroExplosion.visible = false;
};


const createEnemyTank = () => {

    let positionX = 680;
    for (let i = 0; i <= 2; i++) {
        tank = new EnemyTank({
            x: positionX,
            y: 455,
            imageUrl: 'src/assets/tank.png',
            width: 120,
            height: 40
        });
        game.stage.addChild(tank);
        positionX += 200;
        tanks.push(tank);
    };
};


const createTankFire = () => {

    for (let i = 1; i <= 6; i++) {
        const fire = new FireTank({
            x: 800,
            y: 450,
            imageUrl: 'src/assets/fire.png',
        });
        fire.rotation = 3.6;
        fire.width = 26;
        fire.height = 10;
        game.stage.addChild(fire);
        fireArr.push(fire);
    };
};


let tempY = 380;
let tempX = 1200;
const createEnemyAir = () => {
    for (let i = 1; i <= 6; i++) {
        enemy = new EnemyAir({
            x: tempX,
            y: tempY,
            imageUrl: 'src/assets/enemy.png',
            speed: 7
        });
        tempY -= 70;
        tempX += 500;
        game.stage.addChild(enemy);
        enemies.push(enemy);
    };
};


const createGameOver = () => {
    gameOver = new EndScreen({
        x: 100,
        y: 0,
        imageUrl: 'src/assets/game_over.png'
    });
    game.stage.addChild(gameOver);
    gameOver.visible = false;
};

