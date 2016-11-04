import { Individual } from './individual.object';

export class Generation{
    individuals: Array<Individual> = [];

    constructor(){}

    addIndividual(individual: Individual) {
        this.individuals.push(individual);
        this.sortIndividualsByScore();
    }

    sortIndividualsByScore() {
        this.individuals.sort(function (a, b) {
            if (a.score < b.score)
                return -1;
            if (a.score > b.score)
                return 1;
            return 0;
        })
    }
}