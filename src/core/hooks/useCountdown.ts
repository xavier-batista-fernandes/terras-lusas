import { useRef, useState } from 'react';
import { Duration } from 'date-fns';
import { CountdownState } from '../models/countdown-state.ts';
import { secondsToDuration } from '../utils/seconds-to-duration.ts';
import { durationToSeconds } from '../utils/duration-to-seconds.ts';

export function useCountdown(duration: Duration) {
    const intervalRef = useRef(0);
    const [countdown, setCountdown] = useState(duration);
    const [countdownState, setCountdownState] = useState(CountdownState.OFF);

    function startCountdown() {
        setCountdown(duration);
        setCountdownState(CountdownState.ON);
        const startTime = Date.now();

        intervalRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = durationToSeconds(duration) - elapsed;
            setCountdown(secondsToDuration(remaining));

            if (remaining <= 0)
                stopCountdown();
        }, 250);
    }

    function stopCountdown() {
        setCountdownState(CountdownState.OFF);
        clearInterval(intervalRef.current!);
    }

    return { countdown, countdownState, startCountdown, stopCountdown };
}

