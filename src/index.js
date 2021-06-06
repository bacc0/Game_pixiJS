import Hero from './JS/Hero';
import FireTank from './JS/FireTank';
import EndScreen from './JS/EndScreen';
import EnemyAir from './JS/EnemyAir';
import EnemyTank from './JS/EnemyTank';
import { initLevel } from './JS/Background';
import { intersectHandler, score, updateScore } from './JS/__intersect';

export let Game;

let tank, gameOver, heroExplosion, enemy;

let enemies = [];
export let hero;
export let keys = {};
export let tanks = [];
export let fireArr = [];
export let imagesBG = [];

let scoreText;

window.onload = function () { initialize() };

const initialize = () => {

    Game = new PIXI.Application({
        width: 1140,
        height: 540,
        backgroundColor: 0x60B6FF
    });

    document.querySelector('#gameDiv').appendChild(Game.view);
    Game.stage.interactive = true;

    Game.loader
        .add('BG_front', 'src/assets/img/frontBG.png')
        .add('BG_middle_2', 'src/assets/img/midBG.png')
        .add('BG_middle_1', 'src/assets/img/mid2BG.png')
        .add('BG_back', 'src/assets/img/backBG.png');
    Game.loader.onComplete.add(initLevel);
    Game.loader.load();

    createGameOver();

    createHero();

    createEnemyAir();

    createEnemyTank();

    createTankFire();

    createScore();

    Game.ticker.add(gameLoop);

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

    scoreText.text = `Score: ${(score / 1000).toFixed(1)}00 km`;
    updateScore(score);
};



const createHero = () => {

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


const createGameOver = () => {

    gameOver = new EndScreen({
        x: 100,
        y: 0,
        imageUrl: 'src/assets/img/game_over.png'
    });
    Game.stage.addChild(gameOver);
    gameOver.visible = false;
};

const createScore = () => {
    scoreText = new PIXI.Text('Score: 0');

    scoreText.style = new PIXI.TextStyle ({
        fill: 0xFFFFFF,
        fontFamily: 'Goldman',
        fontSize: 30
    });
    scoreText.x = 10;
    scoreText.y = 10;
    Game.stage.addChild(scoreText);
};
