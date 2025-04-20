import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useCountdown } from '../../../core/hooks/useCountdown.ts';
import { MarathonContextType } from './marathon-context-type.ts';
import { areMunicipalitiesEqual } from '../../../core/utils/are-municipalities-equal.ts';
import { Details } from '../../../core/models/details.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/use-municipalities.ts';
import { CountdownState } from '../../../core/models/countdown-state.ts';
import { durationToString } from '../../../core/utils/duration-to-string.ts';
import { useNavigate } from 'react-router-dom';
import { addToMarathonHistory } from '../utils/add-to-marathon-history.ts';
import { subtractDurations } from '../../../core/utils/subtract-durations.ts';
import { durationToSeconds } from '../../../core/utils/duration-to-seconds.ts';
import { GameState } from '../../../core/models/game-states.ts';
import { getMarathonHistory } from '../utils/get-marathon-history.ts';

const MarathonContext = createContext<MarathonContextType | undefined>(undefined);

export function MarathonProvider({ children }: { children: ReactNode }) {

    const GAME_DURATION = { minutes: 10, seconds: 0 }; //TODO: have options? make this configurable?

    const navigate = useNavigate();
    const { countdown, countdownState, startCountdown, stopCountdown } = useCountdown(GAME_DURATION);
    const { details } = useMunicipalities();

    const [gameState, setGameState] = useState(GameState.Idle);
    const [guessedMunicipalities, setGuessedMunicipalities] = useState(new Set<number>());
    const [nonGuessedMunicipalities, setNonGuessedMunicipalities] = useState(new Set<number>());
    const [lastGuess, setLastGuess] = useState<Details | undefined>(undefined);

    const countdownString = durationToString(countdown);

    function marathonStart() {
        setGuessedMunicipalities(new Set());
        setNonGuessedMunicipalities(new Set(details.map((detail) => detail.id)));
        startCountdown();
        setGameState(GameState.Playing);
        navigate('/marathon/play');
    }

    function marathonStop() {
        stopCountdown();
        setGameState(GameState.Completed);
        addToMarathonHistory({
            date: new Date(),
            duration: subtractDurations(GAME_DURATION, countdown),
            guesses: Array.from(guessedMunicipalities).map(municipality => {
                return { municipality };
            }),
            didQuit: durationToSeconds(countdown) > 0,
        });

        const history = getMarathonHistory();
        navigate(`/marathon/results/${history.length - 1}`);
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

    function markCorrect(id: number) {
        setLastGuess(details.find(detail => detail.id === id));

        guessedMunicipalities.add(id); // TODO: why are components reacting to changes?
        nonGuessedMunicipalities.delete(id);
    }

    useEffect(() => {
        if (countdownState === CountdownState.Activated) return;
        if (gameState !== GameState.Playing) return;
        console.log('Marathon countdown finished');
        marathonStop();
    }, [countdownState]);


    return (
        <MarathonContext.Provider
            value={{
                remainingTime: countdownString,
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