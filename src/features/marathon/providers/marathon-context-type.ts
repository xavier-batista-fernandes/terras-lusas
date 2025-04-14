import { GameStates } from '../../../core/models/game-states.ts';
import { Details } from '../../../core/models/details.ts';

export type MarathonContextType = {
    gameState: GameStates;
    setGameState: (state: GameStates) => void;
    
    remainingTime: string;
    guessedMunicipalities: Set<number>;
    lastGuess?: Details;

    getMunicipalityId: (input: string) => number | undefined;

    isGuessRepeated: (id: number) => boolean;
    isGuessCorrect: (id: number) => boolean;

    markCorrect: (id: number) => void;

    marathonStart: () => void;
    marathonStop: () => void;

};