import { FormingGeneration } from '../src/forming-generation.object';
import { Tournament } from '../src/tournament.object';
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

    it('The number of individuals should not change when forming a new generation', (done) => {
        let formingGeneration: FormingGeneration = new FormingGeneration(config, generation);
        expect(formingGeneration.parentGeneration.individuals.length).to.equals(config.populationSize);
        done();
    });
});