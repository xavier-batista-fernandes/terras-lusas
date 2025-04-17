import { Duration } from 'date-fns';
import { durationToSeconds } from './duration-to-seconds.ts';

/**
 * Compares two durations and returns a number indicating their relative order.
 *
 * @param duration1 - The first duration to compare.
 * @param duration2 - The second duration to compare.
 *
 * @returns A number indicating the comparison result.
 *         -1 if duration1 is less than duration2
 *         1 if duration1 is greater than duration2
 *         0 if they are equal.
 */
export function compareDurations(duration1: Duration, duration2: Duration) {
    const seconds1 = durationToSeconds(duration1);
    const seconds2 = durationToSeconds(duration2);

    if (seconds1 < seconds2) return -1;
    if (seconds1 > seconds2) return 1;
    return 0;
}