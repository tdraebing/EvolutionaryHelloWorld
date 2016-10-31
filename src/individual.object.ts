import { Config } from './config.object';

export class Individual {
    target: string;
    alphabet: string;
    mutationThreshold: number;

    name: string;
    score: number;

    constructor(config: Config);
    constructor(config: Config, individualName: string = null) {
        this.target = config.target;
        this.alphabet = config.alphabet;
        this.mutationThreshold = config.mutationThreshold;
        if (individualName != null) {
            this.name = individualName;
            this.score = this.evaluateScore();
        }
    }

    setName(individualName: string) {
        this.name = individualName;
        this.score = this.evaluateScore();
    }

    setRandomName(){
        for (var i = 0; i < this.target.length; i++) {
            this.name += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
        }
        this.score = this.evaluateScore();
    }

    evaluateScore(): number {
        let score: number = 0;
        for (let i = 0; i < this.target.length; i++) {
            if (this.name[i] == this.target[i]) score += 1;
        }
        return score;
    }

    mutate() {
        var mutatedName = "";
        for (let i = 0; i < this.name.length; i++) {
            if (Math.random() < this.mutationThreshold) {
                mutatedName += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
            } else {
                mutatedName += this.name[i];
            }
        }
        this.name = mutatedName;
    }
}