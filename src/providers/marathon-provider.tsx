import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GameStates } from '../models/game-states.ts';
import { useMunicipalities } from './municipalities-provider.tsx';
import { useCountdown } from '../hooks/useCountdown.ts';
import { CountdownUpdates } from '../models/countdown-updates.ts';

type MarathonContextType = {
    remainingTime: number;
    gameState: GameStates;
    setGameState: (state: GameStates) => void;
    guessedMunicipalities: Set<string>;
    isGuessValid: (input: string) => boolean;
    isGuessRepeated: (input: string) => boolean;
    isGuessCorrect: (input: string) => boolean;
    markCorrect: (input: string) => void;
    marathonStart: () => void;
    lastDistrict?: string;
};

const MarathonContext = createContext<MarathonContextType | undefined>(undefined);

export function MarathonProvider({ children }: { children: ReactNode }) {

    const GAME_DURATION_IN_SECONDS = 300; //TODO: have options? make this configurable?

    const { municipalities, getDistrict } = useMunicipalities();

    const [gameState, setGameState] = useState(GameStates.NOT_STARTED);

    const [guessedMunicipalities, setGuessedMunicipalities] = useState(new Set<string>());
    const [nonGuessedMunicipalities, setNonGuessedMunicipalities] = useState(new Set<string>());

    const [lastDistrict, setLastDistrict] = useState<string | undefined>(undefined);


    const { remainingTime, updateCountdown } = useCountdown(GAME_DURATION_IN_SECONDS, onCountdownOver);

    function onCountdownOver() {
        setGameState(GameStates.FINISHED);
        updateCountdown(CountdownUpdates.RESET);
    }

    useEffect(() => {
        switch (gameState) {
            case GameStates.IN_PROGRESS:
                updateCountdown(CountdownUpdates.START);
                break;
            case GameStates.FINISHED:
                updateCountdown(CountdownUpdates.RESET);
                break;
        }
    }, [gameState]);

    function marathonStart() {
        setGameState(GameStates.IN_PROGRESS);
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

        console.log('getDistrict', getDistrict(municipality));
        setLastDistrict(getDistrict(municipality));

        const newGuessedMunicipalities = new Set(guessedMunicipalities);
        newGuessedMunicipalities.add(municipality);
        setGuessedMunicipalities(new Set(newGuessedMunicipalities));

        const newNonGuessedMunicipalities = new Set(nonGuessedMunicipalities);
        newNonGuessedMunicipalities.delete(municipality);
        setNonGuessedMunicipalities(new Set(newNonGuessedMunicipalities));
    }


    return (
        <MarathonContext.Provider
            value={{
                remainingTime,
                gameState,
                setGameState,
                guessedMunicipalities,
                isGuessValid,
                isGuessRepeated,
                isGuessCorrect,
                markCorrect,
                marathonStart,
                lastDistrict,
            }}
        >
            {children}
        </MarathonContext.Provider>
    );
}

export function useMarathon() {
    const context = useContext(MarathonContext);
    if (!context) throw new Error('useMarathon must be used within a MarathonProvider');
    return context;
}