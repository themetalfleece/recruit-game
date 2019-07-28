import { randomArrayElement, removeItemFromArray } from "../helpers/util";

export class Entity {
    private name: string;
    private recruits: Entity[];

    constructor(name: string) {
        this.name = name;
        this.recruits = [];
    }

    public getName(): Entity['name'] {
        return this.name;
    }

    public getRandomRecruit(): Entity {
        return randomArrayElement(this.recruits);
    }

    public getRecruitsLength(): number {
        return this.recruits.length;
    }

    public removeRecruit(recruit: Entity): boolean {
        return removeItemFromArray(this.recruits, recruit);
    }

    public addRecruit(recruit: Entity): void {
        this.recruits.push(recruit);
    }

}