
import { CurrentGeneration } from '../src/current-generation.object';
import { Individual } from '../src/individual.object';
import { Config } from '../src/config.object';
import chai = require('chai');

const expect = chai.expect;

describe('Current-Generation Unit Tests:', () => {

    let config: Config = new Config();
    config.setAlphabet("abcdefghijklmnopqrstuvwxyz ");
    config.setTarget("hello world");
    config.setIterations(10000);
    config.setPopulationSize(10000);
    config.setMutationThreshold(0.3);
    config.setTournamentRoundLength(Math.ceil(100));
    config.setFractionBestForBreeding(0.1);

    it('There should now be RANDOM 10000 individuals in the population', (done) => {
        let generation: CurrentGeneration = new CurrentGeneration(config);
        generation.generateRandomPopulation();
        expect(generation.individuals.length).to.equals(config.populationSize);
        done();
    });

    it('There should now be GIVEN 10000 individuals in the population', (done) => {
        let generation: CurrentGeneration = new CurrentGeneration(config);
        let names: string[] = [];
        for (let i = 1; i <= config.populationSize / 2; i++) {
            names.push('hello world', 'hallo world')
        }
        generation.generatePopulation(names);
        expect(generation.individuals.length).to.equals(config.populationSize);
        done();
    });

    it('Over generations the number of individuals should stay the same', (done) => {
        let generation: CurrentGeneration = new CurrentGeneration(config);
        generation.generateRandomPopulation();
        generation.shiftToNextGeneration();
        expect(generation.individuals.length).to.equals(config.populationSize);
        done();
    });

    it('It should give back the highest score (11)', (done) => {
        let generation: CurrentGeneration = new CurrentGeneration(config);
        let names: string[] = [];
        for (let i = 1; i <= config.populationSize / 2; i++) {
            names.push('hello world', 'hallo world')
        }
        generation.generatePopulation(names);
        generation.sortIndividualsByScore();
        expect(generation.individuals[generation.individuals.length - 1].score).to.equals(11);
        done();
    });
});