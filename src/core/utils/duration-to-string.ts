import { Duration } from 'date-fns';

/**
 * Converts a Duration object to a string in "MM:SS" format.
 *
 * @param duration - The Duration object to convert.
 *
 * @returns A string representing the duration in "MM:SS" format.
 */
export function durationToString(duration: Duration) {
    const minutes = String(duration.minutes ?? '0').padStart(2, '0');
    const seconds = String(duration.seconds ?? '0').padStart(2, '0');
    return `${minutes}:${seconds}`;
}