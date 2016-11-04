import { Individual } from './individual.object';
import { Config } from './config.object';
import { Generation } from './generation.object';
import { Tournament } from './tournament.object';


export class FormingGeneration extends Generation {
    parents: Array<Individual> = [];
    config: Config;
    parentGeneration: Generation;

    constructor(config: Config, parentGeneration: Generation) {
        super()
        this.config = config;
        this.parentGeneration = parentGeneration;
    }

    private _selectIndividualsByFitness() {
        super.sortIndividualsByScore();
        let selectionSize: number = Math.floor(this.parentGeneration.individuals.length * this.config.fractionBestForBreeding);
        for (let i = 0; i < selectionSize; i++) {
            this.parents.push(this.parentGeneration.individuals.pop());
        }
    }

    private _selectIndividualsByTournament() {
        let tournament = new Tournament(this.parentGeneration, this.config);
        this.parents = this.parents.concat(tournament.performTournament());
    }

    private _recombination(father, mother) {
        let splitPos = Math.floor(Math.random() * this.config.target.length);
        let boy: Individual = new Individual(this.config);
        let girl: Individual = new Individual(this.config);
        boy.setName(mother.name.slice(0, splitPos) + father.name.slice(splitPos, father.name.length));
        girl.setName(father.name.slice(0, splitPos) + mother.name.slice(splitPos, mother.name.length));
        this.individuals.push(boy, girl);
    }

    private _breedChildren() {
        while (this.parents.length > 1) {
            let fatherId = Math.floor(Math.random() * this.parents.length);
            let father = this.parents[fatherId];
            this.parents.splice(fatherId, 1)
            let motherId = Math.floor(Math.random() * this.parents.length);
            let mother = this.parents[motherId];
            this.parents.splice(motherId, 1);
            this._recombination(father, mother);
            this.individuals.push(father, mother);
        }
    }

    private _mutate() {
        for (let i = 0; i < this.individuals.length; i++) {
            this.individuals[i].mutate();
        }
        super.sortIndividualsByScore();
    }

    formNewGeneration() {
        this._selectIndividualsByFitness();
        this._selectIndividualsByTournament();
        this._breedChildren();
        this._mutate();
    }

}