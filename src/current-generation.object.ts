import { Individual } from './individual.object';
import { Config } from './config.object';
import { Generation } from './generation.object';
import { FormingGeneration } from './forming-generation.object';


export class CurrentGeneration extends Generation {
    config: Config;

    constructor(config: Config) {
        super()
        this.config = config;
    }

    generateRandomPopulation() {
        for (let i = 1; i <= this.config.populationSize; i++) {
            let individual = new Individual(this.config);
            individual.setRandomName();
            this.individuals.push(individual);
        }
        super.sortIndividualsByScore();
    }

    generatePopulation(names: string[]) {
        if (names.length !== this.config.populationSize) throw Error('Not enough names to fill population.');
        for (let i = 0; i < this.config.populationSize; i++) {
            let individual = new Individual(this.config);
            individual.setName(names[i]);
            this.individuals.push(individual);
        }
        super.sortIndividualsByScore();
    }

    shiftToNextGeneration() {
        let formingGeneration: FormingGeneration = new FormingGeneration(this.config, this);
        formingGeneration.formNewGeneration();
        this.individuals = formingGeneration.individuals;
    }

    runEvolutionProcess(): number {
        console.log('Iterating over generations...');
        console.log(this.config.iterations);
        for (let i = 1; i <= this.config.iterations; i++){
            this.shiftToNextGeneration();
            super.sortIndividualsByScore();
            let bestScore: number = this.individuals[this.individuals.length-1].score;
            if (bestScore === this.config.target.length) {
                console.log('Correct string generated after ' + i.toString() + ' iterations! (Score: ' + bestScore + ' )');
                return 0;
            }
        }
        console.log('The correct string could not be generated with the given configuration.');
        console.log('The best individual was: ')
        super.sortIndividualsByScore();
        console.log(this.individuals[this.individuals.length-1]);
        return -1;
    }

}