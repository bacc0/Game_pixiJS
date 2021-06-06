import Hero from './JS/Hero';
import FireTank from './JS/FireTank';
import EndScreen from './JS/EndScreen';
import EnemyAir from './JS/EnemyAir';
import EnemyTank from './JS/EnemyTank';
import { initLevel } from './JS/Background';
import { intersectHandler } from './JS/__intersect';

export let game;

let tank, tiling, hero, gameOver, heroExplosion, enemy;
export { hero, tiling };

let enemies = [];
export let keys = {};
export let tanks = [];
export let fireArr = [];
export let imagesBG = [];


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

const keysDown = (e) => { keys[e.keyCode] = true; };
const keysUp = (e) => { keys[e.keyCode] = false; };


export const gameLoop = () => {

    hero.updatePosition();

    imagesBG.forEach(img => {
        img.updateBG()
    });

    tanks.forEach( t => {
        t.updatePosition();
    
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

