
import { Generation } from '../src/generation.object';
import { Individual } from '../src/individual.object';
import { Config } from '../src/config.object';
import chai = require('chai');

const expect = chai.expect;

describe('Generation Unit Tests:', () => {
    let config: Config = new Config();
    config.setAlphabet("abcdefghijklmnopqrstuvwxyz ");
    config.setTarget("hello world");
    config.setIterations(10000);
    config.setPopulationSize(10000);
    config.setMutationThreshold(0.3);
    config.setTournamentRoundLength(Math.ceil(100));
    config.setFractionBestForBreeding(0.1);

        it('There should be three individuals in the generation', (done) => {
            let generation: Generation = new Generation();
            for (let i = 0; i < 3; i++){
                generation.addIndividual(new Individual(config));
            }
            expect(generation.individuals.length).to.equals(3);
            done();
        });

        it('The individual-objects should be sorted by score lowest to highest', (done) => {
            let generation: Generation = new Generation();
            let names: string[] = ['hello world', 'hallo world', 'world hallo'];
            for (let i = 0; i < 3; i++){
                let individual: Individual = new Individual(config);
                individual.setName(names[i]);
                generation.addIndividual(individual);
            }
            generation.sortIndividualsByScore();
            expect(generation.individuals.map(ind => ind.score)).to.eql([3, 10, 11]);
            done();
        });
});