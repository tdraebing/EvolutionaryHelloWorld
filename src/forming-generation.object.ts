import { Individual } from './individual.object';
import { Config } from './config.object';
import { Generation } from './generation.object';
import { Tournament } from './tournament.object';


export class FormingGeneration extends Generation {
    individuals: Array<Individual>;
    parents: Array<Individual>;
    config: Config;
    parentGeneration: Generation;

    constructor(config: Config, parentGeneration: Generation) {
        super()
        this.config = config;
        this.parentGeneration = parentGeneration;
    }

    private _selectIndividualsByFitness() {
        super.sortIndividualsByScore();
        for (let i = 0; i < Math.floor(this.parentGeneration.individuals.length * this.config.fractionBestForBreeding); i++) {
            this.parents.push(this.parentGeneration.individuals.pop());
        }
    }

    private _selectIndividualsByTournament() {
        let tournament = new Tournament(this.parentGeneration, this.config);
        this.parents = this.parents.concat(tournament.performTournament());
    }

    private _recombination(father, mother): Individual[] {
        var splitPos = Math.floor(Math.random() * this.config.target.length);
        var boy = mother.name.slice(0, splitPos) + father.name.slice(splitPos, father.name.length);
        var girl = father.name.slice(0, splitPos) + mother.name.slice(splitPos, mother.name.length);
        return [boy, girl];
    }

    private _breedChildren() {
        while (this.parents.length > 1) {
            var fatherId = Math.floor(Math.random() * this.parents.length);
            var father = this.parents[fatherId];
            this.parents.splice(fatherId, 1)
            var motherId = Math.floor(Math.random() * this.parents.length);
            var mother = this.parents[motherId];
            this.parents.splice(motherId, 1)
            this.individuals.concat(this._recombination(father, mother))
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
        this.individuals = this.individuals.concat(this.parents);
        this._mutate();
    }

}