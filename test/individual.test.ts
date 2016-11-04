
import { Individual } from '../src/individual.object';
import { Config } from '../src/config.object';
import chai = require('chai');

const expect = chai.expect;

describe('Individual Unit Tests:', () => {
    let config: Config = new Config();
    config.setAlphabet("abcdefghijklmnopqrstuvwxyz ");
    config.setTarget("hello world");
    config.setIterations(10000);
    config.setPopulationSize(10000);
    config.setMutationThreshold(0.3);
    config.setTournamentRoundLength(Math.ceil(100));
    config.setFractionBestForBreeding(0.1);

    let individual: Individual = new Individual(config);
    it("Random name should be of correct length", (done) => {
        individual.setRandomName();
        expect(individual.name.length).to.equals(config.target.length);
        done();
    });
    it("Name should be 'hello_world'", (done) => {
        individual.setName('hello world');
        expect(individual.name).to.equals('hello world');
        done();
    });
    it("Score should be 11", (done) => {
        individual.setName('hello world');
        expect(individual.score).to.equals(11);
        done();
    });
    it("Score should be 0", (done) => {
        individual.setName('toofu-sheep');
        expect(individual.score).to.equals(0);
        done();
    });
    it("Mutation should roughly change one third (mutationRate set to 0.3) of characters", (done) => {
        let changed: number[] = [];
        let iter: number = 100;
        for (let i = 1; i <= iter; i++){
            individual.setName('hello world');
            individual.mutate();
            changed.push(individual.score);
        }
        let rate = changed.map(x => x / individual.name.length)
            .reduce((prev, curr) => prev + curr)
        rate = 1 - rate / iter;
        expect(rate).to.closeTo(config.mutationThreshold, 0.1);
        done();
    });
});