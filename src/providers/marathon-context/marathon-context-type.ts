import { GameStates } from '../../models/game-states.ts';

export type MarathonContextType = {
    remainingTime: string;
    gameState: GameStates;
    guessedMunicipalities: Set<string>;
    isGuessValid: (input: string) => boolean;
    isGuessRepeated: (input: string) => boolean;
    isGuessCorrect: (input: string) => boolean;
    markCorrect: (input: string) => void;
    marathonStart: () => void;
    marathonStop: () => void;
    lastDistrict?: string;
};