import { useEffect, useState } from 'react';
import { useMunicipalities } from '../providers/municipalities-provider.tsx';
import { gameStates } from '../models/game-states.ts';
import { useCountdown } from './useCountdown.ts';
import { CountdownUpdates } from '../models/countdown-updates.ts';

export function useMarathon() {
    const GAME_DURATION_IN_SECONDS = 180;

    const { municipalities } = useMunicipalities();

    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);

    const [guessedMunicipalities, setGuessedMunicipalities] = useState(new Set<string>());
    const [nonGuessedMunicipalities, setNonGuessedMunicipalities] = useState(new Set<string>());


    const { remainingTime, updateCountdown } = useCountdown(GAME_DURATION_IN_SECONDS, onCountdownOver);

    function onCountdownOver() {
        setGameState(gameStates.GAME_OVER);
        updateCountdown(CountdownUpdates.RESET);
    }

    useEffect(() => {
        switch (gameState) {
            case gameStates.IN_PROGRESS:
                updateCountdown(CountdownUpdates.START);
                break;
            case gameStates.GAME_OVER:
                updateCountdown(CountdownUpdates.RESET);
                break;
        }
    }, [gameState]);

    function marathonStart() {
        setGameState(gameStates.IN_PROGRESS);
        setGuessedMunicipalities(new Set());
        setNonGuessedMunicipalities(new Set(municipalities));
    }

    function isGuessValid(input: string) {
        let isValid = false;
        municipalities.forEach((municipality) => {
            if (input.toUpperCase() === municipality.toUpperCase()) isValid = true;
        });
        return isValid;
    }

    function isGuessRepeated(input: string) {
        let isRepeated = false;
        guessedMunicipalities.forEach((municipality) => {
            if (input.toUpperCase() === municipality.toUpperCase()) isRepeated = true;
        });
        return isRepeated;
    }

    function isGuessCorrect(input: string) {
        let isCorrect = false;
        nonGuessedMunicipalities.forEach((municipality) => {
            if (input.toUpperCase() === municipality.toUpperCase()) isCorrect = true;
        });
        return isCorrect;
    }

    function markCorrect(municipality: string) {
        const newGuessedMunicipalities = new Set(guessedMunicipalities);
        newGuessedMunicipalities.add(municipality);
        setGuessedMunicipalities(new Set(newGuessedMunicipalities));

        const newNonGuessedMunicipalities = new Set(nonGuessedMunicipalities);
        newNonGuessedMunicipalities.delete(municipality);
        setNonGuessedMunicipalities(new Set(newNonGuessedMunicipalities));
    }

    return {
        remainingTime,
        gameState,
        setGameState,
        guessedMunicipalities,
        isGuessValid,
        isGuessRepeated,
        isGuessCorrect,
        markCorrect,
        marathonStart,
    };
}