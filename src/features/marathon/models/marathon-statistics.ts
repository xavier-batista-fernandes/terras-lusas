import { MarathonGuess } from './marathon-guess.ts';

export interface MarathonStatistics {
    date: Date;
    duration: string;
    guesses: MarathonGuess[];
}