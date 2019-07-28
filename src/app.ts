import { Entity } from './game/Entity';
import { Game } from './game/Game';

const names = [
    'Burt Hammond',
    'Freida Britt',
    'Caldwell Holmes',
    'Reba Kennedy',
    'Dudley Boyer',
    'Joan Mccullough',
];

const entities: Entity[] = [];
for (let i = 0; i < names.length; i++) {
    entities.push(new Entity(names[i]));
}

const game = new Game(entities);
game.loop();
