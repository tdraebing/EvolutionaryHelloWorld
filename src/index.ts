import { CurrentGeneration } from './current-generation.object';
import { Config } from './config.object';


(function () {
    let config: Config = new Config();
    //Configure the run here by using setter methods:
    //====================================================================================
    //config.setAlphabet("abcdefghijklmnopqrstuvwxyz ");
    //config.setTarget("hello world");
    //config.setIterations(10000);
    //config.setPopulationSize(10000);
    //config.setMutationThreshold(0.1);
    //config.setTournamentRoundLength(Math.ceil(populationSize * 0.5));
    //config.setFractionBestForBreeding(0.1);

    //Create your starting generation
    let generation: CurrentGeneration = new CurrentGeneration(config);

    //populate starting generation with random individuals
    generation.generateRandomPopulation();

    //let the evolution do its work
    generation.runEvolutionProcess();

})()