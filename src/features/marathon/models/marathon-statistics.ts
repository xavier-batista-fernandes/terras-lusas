import { MarathonGuess } from './marathon-guess.ts';
import { Duration } from 'date-fns';

export interface MarathonStatistics {
    date: Date;
    duration: Duration;
    guesses: MarathonGuess[];
    didQuit: boolean;
}