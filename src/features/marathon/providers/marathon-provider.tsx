import { createContext, ReactNode, useContext, useState } from 'react';
import { GameStates } from '../../../core/models/game-states.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/municipalities-provider.tsx';
import { useCountdown } from '../../../core/hooks/useCountdown.ts';
import { MarathonContextType } from './marathon-context-type.ts';

const MarathonContext = createContext<MarathonContextType | undefined>(undefined);

export function MarathonProvider({ children }: { children: ReactNode }) {

    const GAME_DURATION = { minutes: 3, seconds: 15 }; //TODO: have options? make this configurable?

    const { countdown, startCountdown, resetCountdown } = useCountdown(GAME_DURATION, onCountdownOver);
    const { municipalities, getDistrict } = useMunicipalities();

    const [gameState, setGameState] = useState(GameStates.NOT_STARTED);
    const [guessedMunicipalities, setGuessedMunicipalities] = useState(new Set<string>());
    const [nonGuessedMunicipalities, setNonGuessedMunicipalities] = useState(new Set<string>());
    const [lastDistrict, setLastDistrict] = useState<string | undefined>(undefined);

    function onCountdownOver() {
        setGameState(GameStates.FINISHED);
        resetCountdown();
    }

    function marathonStart() {
        setGameState(GameStates.IN_PROGRESS);
        startCountdown();
        setGuessedMunicipalities(new Set());
        setNonGuessedMunicipalities(new Set(municipalities));
    }

    function marathonStop() {
        setGameState(GameStates.FINISHED);
        resetCountdown();
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

    // TODO: only save ids in the municipalities array? easier to compare
    function markCorrect(municipality: string) {
        setLastDistrict(getDistrict(municipality));

        const newGuessedMunicipalities = new Set(guessedMunicipalities);
        newGuessedMunicipalities.add(municipality);
        setGuessedMunicipalities(new Set(newGuessedMunicipalities));

        const newNonGuessedMunicipalities = new Set(nonGuessedMunicipalities);
        newNonGuessedMunicipalities.delete(municipality);
        setNonGuessedMunicipalities(new Set(newNonGuessedMunicipalities));

        // addToMarathonHistory({ date: new Date().toDateString() });
    }


    return (
        <MarathonContext.Provider
            value={{
                remainingTime: countdown,
                gameState,
                guessedMunicipalities,
                isGuessValid,
                isGuessRepeated,
                isGuessCorrect,
                markCorrect,
                marathonStart,
                marathonStop,
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