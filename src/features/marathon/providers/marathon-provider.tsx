import { createContext, ReactNode, useContext, useState } from 'react';
import { GameStates } from '../../../core/models/game-states.ts';
import { useCountdown } from '../../../core/hooks/useCountdown.ts';
import { MarathonContextType } from './marathon-context-type.ts';
import { areMunicipalitiesEqual } from '../../../core/utilities/are-municipalities-equal.ts';
import { addToMarathonHistory } from '../statistics/add-to-marathon-history.ts';
import { Details } from '../../../core/models/details.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/use-municipalities.ts';

const MarathonContext = createContext<MarathonContextType | undefined>(undefined);

export function MarathonProvider({ children }: { children: ReactNode }) {

    const GAME_DURATION = { minutes: 3, seconds: 15 }; //TODO: have options? make this configurable?

    const { countdown, startCountdown, resetCountdown } = useCountdown(GAME_DURATION, onCountdownOver);
    const { details } = useMunicipalities();

    const [gameState, setGameState] = useState(GameStates.NOT_STARTED);
    const [guessedMunicipalities, setGuessedMunicipalities] = useState(new Set<number>());
    const [nonGuessedMunicipalities, setNonGuessedMunicipalities] = useState(new Set<number>());
    const [lastGuess, setLastGuess] = useState<Details | undefined>(undefined);

    function marathonStart() {
        setGameState(GameStates.IN_PROGRESS);
        startCountdown();
        setGuessedMunicipalities(new Set());
        setNonGuessedMunicipalities(new Set(details.map((detail) => detail.id)));
    }

    function marathonStop() {
        setGameState(GameStates.FINISHED);
        console.log('Adding to Marathon History:', {
            date: new Date(),
            municipalities: Array.from(guessedMunicipalities),
        });
        addToMarathonHistory({
            date: new Date(),
            municipalities: Array.from(guessedMunicipalities),
        });
        resetCountdown();
    }

    function getMunicipalityId(municipality: string) {
        const target = details.find((detail) => areMunicipalitiesEqual(detail.municipality, municipality));
        return target?.id;
    }

    function isGuessRepeated(id: number) {
        return guessedMunicipalities.has(id);
    }

    function isGuessCorrect(id: number) {
        return nonGuessedMunicipalities.has(id);
    }

    function onCountdownOver() {
        marathonStop();
    }

    function markCorrect(id: number) {
        setLastGuess(details.find(detail => detail.id === id));

        const newGuessedMunicipalities = new Set(guessedMunicipalities);
        newGuessedMunicipalities.add(id);
        setGuessedMunicipalities(new Set(newGuessedMunicipalities));

        const newNonGuessedMunicipalities = new Set(nonGuessedMunicipalities);
        newNonGuessedMunicipalities.delete(id);
        setNonGuessedMunicipalities(new Set(newNonGuessedMunicipalities));
    }


    return (
        <MarathonContext.Provider
            value={{
                remainingTime: countdown,
                gameState,
                setGameState,
                guessedMunicipalities,
                lastGuess,
                getMunicipalityId,
                isGuessRepeated,
                isGuessCorrect,
                markCorrect,
                marathonStart,
                marathonStop,
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