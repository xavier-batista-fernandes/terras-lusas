import { useEffect, useState } from 'react';
import { CountdownUpdates, useCountdown } from './useCountdown.ts';
import { useMunicipalities } from '../providers/municipalities-provider.tsx';
import { gameStates } from '../models/gameStates.ts';

export function useMarathon() {
    const GAME_DURATION_IN_SECONDS = 180;

    const { municipalities } = useMunicipalities();

    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [correctMunicipalities, setCorrectMunicipalities] = useState(new Set<string>());

    const { remainingTime, updateState } = useCountdown(GAME_DURATION_IN_SECONDS, onCountdownOver);

    function onCountdownOver() {
        setGameState(gameStates.GAME_OVER);
        updateState(CountdownUpdates.RESET);
    }

    useEffect(() => {
        switch (gameState) {
            case gameStates.IN_PROGRESS:
                updateState(CountdownUpdates.START);
                break;
            case gameStates.GAME_OVER:
                updateState(CountdownUpdates.RESET);
                break;
        }
    }, [gameState]);

    function isMunicipalityCorrect(input: string) {
        // TODO: refactor this into a single array? how to convert to a single array?
        let isCorrect = false;
        municipalities.forEach((municipalitySet) => {
            municipalitySet.forEach((municipality) => {
                if (input.toUpperCase() === municipality.toUpperCase()) {
                    isCorrect = true;
                }
            });
        });

        return isCorrect;
    }

    function addMunicipality(municipality: string) {
        if (correctMunicipalities.has(municipality)) {
            console.log('You already guessed this one...');
            return;
        }

        setCorrectMunicipalities(new Set([...correctMunicipalities, municipality]));
    }

    return {
        remainingTime,
        updateState,
        gameState,
        setGameState,
        correctMunicipalities,
        addMunicipality,
        isMunicipalityCorrect,
    };
}