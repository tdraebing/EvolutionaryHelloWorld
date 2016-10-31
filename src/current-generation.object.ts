import { Individual } from './individual.object';
import { Config } from './config.object';
import { Generation } from './generation.object';
import { FormingGeneration } from './forming-generation.object';


export class CurrentGeneration extends Generation {
    config: Config;
    individuals: Array<Individual>;

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

    getBestFitness(): number {
        let bestScore: number = this.config.target.length;
        for (let i = 0; i < this.individuals.length; i++) {
            bestScore = this.individuals[i].score >= bestScore
                ? bestScore
                : this.individuals[i].score;
        }
        return bestScore;
    }

    shiftToNextGeneration() {
        let formingGeneration: FormingGeneration = new FormingGeneration(this.config, this);
        formingGeneration.formNewGeneration();
        this.individuals = formingGeneration.individuals;
    }

    runEvolutionProcess(): number {
        for (let i = 1; i <= this.config.iterations; i++){
            this.shiftToNextGeneration();
            let bestScore: number = this.getBestFitness();
            if (bestScore === 0) {
                console.log('Correct string generated after ' + i.toString() + ' iterations!');
                return 0;
            }
        }
        console.log('The correct string could not be generated with the given configuration.');
        return -1;
    }

}