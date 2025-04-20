import { useRef, useState } from 'react';
import { Duration } from 'date-fns';
import { CountdownState } from '../models/countdown-state.ts';
import { secondsToDuration } from '../utils/seconds-to-duration.ts';
import { durationToSeconds } from '../utils/duration-to-seconds.ts';

export function useCountdown(duration: Duration) {
    const intervalRef = useRef(0);
    const [countdown, setCountdown] = useState(duration);
    const [countdownState, setCountdownState] = useState(CountdownState.Deactivated);

    function startCountdown() {
        clearInterval(intervalRef.current);
        setCountdown(duration);
        setCountdownState(CountdownState.Activated);
        const startTime = Date.now();

        intervalRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(durationToSeconds(duration) - elapsed, 0);
            setCountdown(secondsToDuration(remaining));
            if (remaining === 0) stopCountdown();
        }, 250);
    }

    function stopCountdown() {
        clearInterval(intervalRef.current);
        setCountdownState(CountdownState.Deactivated);
    }

    return { countdown, countdownState, startCountdown, stopCountdown };
}

