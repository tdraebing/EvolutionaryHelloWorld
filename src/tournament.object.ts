import { Generation } from './generation.object';
import { Individual } from './individual.object';
import { Config } from './config.object';

export class Tournament{
    participants: Generation;
    winners: Generation;
    config: Config;

    constructor(participants: Generation, config: Config) {
        this.participants = participants;
        this.config = config;
        this.winners = new Generation();
    }

    private _fightTournamentRound() {
        let populationSize: number = this.participants.individuals.length;
        let championId: number = Math.floor(Math.random() * populationSize);
        let champion: Individual = this.participants.individuals[championId];
        for (var i = 1; i <= 10; i++) {
            let competitorId: number = Math.floor(Math.random() * populationSize);
            let competitor: Individual = this.participants.individuals[competitorId];
            if (champion.score <= competitor.score) {
                champion = competitor;
                championId = competitorId;
            }
        }
        return { 'id': championId, 'champion': champion };
    }

    performTournament(): Individual[] {
        let winnerCount = this.config.populationSize / 2 - this.config.fractionBestForBreeding * this.config.populationSize;
        while (this.winners.individuals.length <= winnerCount) {
            let tournamentRoundResult = this._fightTournamentRound();
            this.winners.individuals.push(tournamentRoundResult.champion);
            this.participants.individuals.splice(tournamentRoundResult.id, 1);
        }
        return this.winners.individuals;
    }
}