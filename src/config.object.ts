//TODO: Tree structure

export class Config{
    //target string configuration
    alphabet: string = "abcdefghijklmnopqrstuvwxyz ";
    target: string = "hello world";

    //algorithm size
    iterations: number = 10000;
    populationSize: number = 10000;

    //evolution parameters
    mutationThreshold: number = 0.1;
    tournamentRoundLength: number = Math.ceil(this.populationSize * 0.5);
    fractionBestForBreeding: number = 0.1;

    constructor() { }

    setAlphabet(alphabet: string) {
        this.alphabet = alphabet;
    }

    setTarget(target: string) {
        this.target = target;
    }

    setIterations(iterations: number) {
        this.iterations = iterations;
    }

    setPopulationSize(populationSize: number) {
        this.populationSize = populationSize;
    }

    setMutationThreshold(mutationThreshold: number) {
        this.mutationThreshold = mutationThreshold;
    }

    setTournamentRoundLength(tournamentRoundLength: number) {
        this.tournamentRoundLength = tournamentRoundLength;
    }

    setFractionBestForBreeding(fractionBestForBreeding: number) {
        this.fractionBestForBreeding = fractionBestForBreeding;
    }
}