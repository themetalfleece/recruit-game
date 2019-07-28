# recruit-game

### A game where many entities randomly recruit the others, until one one remains

On each iteration, an random entity (attacker) selects another random entity (defender). If the defender has any recruits, the attack steals a number of them (increases as rounds pass). If not, the attacker recruits the defender.

This repeats until only one entity remains, which is the winner.

In the future, a gamified system can be developed, where each player selects one entity and wins/loses points if it won/lost respectively. Each iteration can last a big period of time, like an hour, and be decreased as rounds pass.

## How to build
* Install [node.js](https://nodejs.org/en/), then [yarn](https://yarnpkg.com/lang/en/docs/install/)
* Clone this repo and navigate to its directory
* Run `yarn` to install the dependencies
* Run `yarn build` to build the javascript files from the typescript files
* Run `yarn start` to start the app

## Example output
```
**Turn 17**
Reba Kennedy attacked Joan Mccullough
Reba Kennedy recruited 1 recruits!
Joan Mccullough now has 1 recruits
Reba Kennedy now has 3 recruits
...
**Turn 22**
Reba Kennedy attacked Joan Mccullough
Joan Mccullough is out of the game!
Reba Kennedy now has 5 recruits
Reba Kennedy won the game!
```

##Exaple usage
```
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
```