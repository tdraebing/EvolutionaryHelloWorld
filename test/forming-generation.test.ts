import { FormingGeneration } from '../src/forming-generation.object';
import { CurrentGeneration } from '../src/current-generation.object';
import { Individual } from '../src/individual.object';
import { Config } from '../src/config.object';
import chai = require('chai');

const expect = chai.expect;

describe('Forming-Generation Unit Tests:', () => {

    let config: Config = new Config();
    config.setAlphabet("abcdefghijklmnopqrstuvwxyz ");
    config.setTarget("hello world");
    config.setIterations(10000);
    config.setPopulationSize(10000);
    config.setMutationThreshold(0.3);
    config.setTournamentRoundLength(Math.ceil(100));
    config.setFractionBestForBreeding(0.1);

    let generation: CurrentGeneration = new CurrentGeneration(config);
    generation.generateRandomPopulation();
    describe('Basic tests and selection:', () => {
        let formingGeneration: FormingGeneration = new FormingGeneration(config, generation);
        it('The number of individuals should not change when forming a new generation', (done) => {
            expect(formingGeneration.parentGeneration.individuals.length).to.equals(config.populationSize);
            done();
        });

        it('There should be the fraction of individuals selected as stated in the config', (done) => {
            formingGeneration["_selectIndividualsByFitness"]();
            expect(formingGeneration.parents.length).to.equals(config.populationSize * config.fractionBestForBreeding);
            done();
        });
    });

    describe('Recombination:', () => {
        let formingGeneration: FormingGeneration = new FormingGeneration(config, generation);
        let father: Individual = new Individual(config);
        father.setName('hello world');
        let mother: Individual = new Individual(config);
        mother.setName('see you too');
        formingGeneration["_recombination"](father, mother);
        it('There should be two individuals in the forming generation', (done) => {
            expect(formingGeneration.individuals.length).to.equals(2);
            done();
        });
    });
});