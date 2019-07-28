import { Entity } from "./Entity";
import { randomArrayElement, removeItemFromArray } from "../helpers/util";

export class Game {
    private entities: Entity[];
    private turnIndex: number;
    private state: 'initialized' | 'ongoing' | 'ended';
    private turnEvent: {
        turnIndex: number;
        attacker: Entity;
        defender: Entity;
        wasDefenderDefeated?: boolean;
        recruitedFromDefender?: Entity[];
        winner?: Entity;
    };

    constructor(entities: Entity[]) {
        this.entities = entities;
        this.turnIndex = -1;
        this.state = 'initialized';
    }

    public loop(): void {
        while (this.state !== 'ended') {
            this.newTurn();
        }
    }

    private newTurn() {
        if (this.state === 'ended') { return; }

        this.state = 'ongoing';

        this.turnIndex++;

        const attackerEntity = this.getRandomEntity();
        const defenderEntity = this.getRandomEntity(attackerEntity);

        this.turnEvent = {
            turnIndex: this.turnIndex,
            attacker: attackerEntity,
            defender: defenderEntity,
        }

        if (defenderEntity.getRecruitsLength()) {

            const totalToRecruit = Math.min(
                Math.max(attackerEntity.getRecruitsLength(), 1),
                1 + Math.floor(this.turnIndex / 20),
            );

            this.turnEvent.recruitedFromDefender = [];
            for (let j = 0; j < totalToRecruit; j++) {
                const recruitToRecruit = defenderEntity.getRandomRecruit();
                if (!recruitToRecruit) { break; }
                defenderEntity.removeRecruit(recruitToRecruit);
                attackerEntity.addRecruit(recruitToRecruit);

                this.turnEvent.recruitedFromDefender.push(recruitToRecruit);
            }
        } else {
            this.removeEntity(defenderEntity);
            attackerEntity.addRecruit(defenderEntity);

            this.turnEvent.wasDefenderDefeated = true;
        }

        if (this.entities.length === 1) {
            this.turnEvent.winner = this.entities[0];

            this.state = 'ended';
        }

        console.log(this.getFriendlyTurnEvent());

    }

    private getFriendlyTurnEvent() {
        const turnEvent = this.turnEvent;

        const events = [];

        events.push(`\n**Turn ${turnEvent.turnIndex}**`);
        events.push(`${turnEvent.attacker.getName()} attacked ${turnEvent.defender.getName()}`);
        if (turnEvent.wasDefenderDefeated) {
            events.push(`${turnEvent.defender.getName()} is out of the game!`);
        } else {
            events.push(`${turnEvent.attacker.getName()} recruited ${turnEvent.recruitedFromDefender.length} recruits!`)
            events.push(`${turnEvent.defender.getName()} now has ${turnEvent.defender.getRecruitsLength()} recruits`);
        }
        events.push(`${turnEvent.attacker.getName()} now has ${turnEvent.attacker.getRecruitsLength()} recruits`);
        if (turnEvent.winner) {
            events.push(`${turnEvent.winner.getName()} won the game!`);
        }

        return events.join('\n');
    }

    private getRandomEntity(notEqual?: Entity): Entity {
        const entities = notEqual ? this.entities.filter((v) => v !== notEqual) : this.entities;
        return randomArrayElement(entities);
    }

    private removeEntity(entity: Entity) {
        removeItemFromArray(this.entities, entity);
    }
}