import { useRef, useState } from 'react';
import { Duration, intervalToDuration } from 'date-fns';
import { CountdownState } from '../models/countdown-state.ts';

/**
 * Custom countdown hook that counts down from a given duration.
 * Ignores years, months, and weeks in the Duration object.
 *
 * @param duration - The duration to count down from (hours, minutes, seconds).
 * @returns An object with:
 *   - countdown: A formatted string in "MM:SS" format.
 *   - countdownState: An enum of which state countdown is in.
 *   - startCountdown: Function to start the countdown.
 *   - resetCountdown: Function to reset and stop the countdown.
 */
export function useCountdown(duration: Duration) {
    const intervalRef = useRef(0);
    const [countdown, setCountdown] = useState(getInitialCountdown(duration));
    const [countdownState, setCountdownState] = useState(CountdownState.OFF);

    const totalSeconds = getTotalSeconds(duration);

    /**
     * Starts the countdown timer. Calls the callback when time runs out.
     */
    function startCountdown() {
        setCountdownState(CountdownState.ON);
        const startTime = Date.now();

        intervalRef.current = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = totalSeconds - elapsed;

            if (remaining <= 0) {
                resetCountdown();
                return;
            }

            setCountdown(formatCountdown(remaining));
        }, 250);
    }

    /**
     * Resets the countdown and clears the interval.
     */
    function resetCountdown() {
        setCountdownState(CountdownState.OFF);
        clearInterval(intervalRef.current!);
        setCountdown(getInitialCountdown(duration));
    }

    return { countdown, countdownState, startCountdown, resetCountdown };
}

/**
 * Converts total seconds to a "Minutes:Seconds" string.
 *
 * @param secondsLeft - Time left in seconds.
 * @returns A formatted string like "03:45".
 */
function formatCountdown(secondsLeft: number): string {
    const duration = intervalToDuration({ start: 0, end: secondsLeft * 1000 });
    const minutes = String(duration.minutes ?? '0').padStart(2, '0');
    const seconds = String(duration.seconds ?? '0').padStart(2, '0');
    return `${minutes}:${seconds}`;
}

/**
 * Converts a Duration object into total seconds.
 * Ignores years, months, weeks and days.
 *
 * @param duration - The Duration object (hours, minutes, seconds).
 * @returns The total duration in seconds.
 */
function getTotalSeconds({ hours = 0, minutes = 0, seconds = 0 }: Duration): number {
    return hours * 3600 + minutes * 60 + seconds;
}


/**
 * Returns the initial countdown string based on the given duration.
 *
 * @param duration
 * @returns A string in the "Minutes:Seconds" format.
 */
function getInitialCountdown(duration: Duration): string {
    const totalSeconds = getTotalSeconds(duration);
    return formatCountdown(totalSeconds);
}
