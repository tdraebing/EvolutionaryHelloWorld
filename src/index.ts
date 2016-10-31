import { CurrentGeneration } from './current-generation.object';
import { Config } from './config.object';


(function () {
    let config: Config = new Config();
    //Configure the run here by using setter methods:
    //====================================================================================
    //this.config.setAlphabet("abcdefghijklmnopqrstuvwxyz ");
    //this.config.setTarget("hello world");
    //this.config.setIterations(10000);
    //this.config.setPopulationSize(10000);
    //this.config.setMutationThreshold(0.3);
    //this.config.setTournamentRoundLength(Math.ceil(this.populationSize * 0.1));
    //this.config.setFractionBestForBreeding(0.1);

    //Create your starting generation
    let generation: CurrentGeneration = new CurrentGeneration(config);

    //populate starting generation with random individuals
    generation.generateRandomPopulation();

    //let the evolution do its work
    generation.runEvolutionProcess();

})()