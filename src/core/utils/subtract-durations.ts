import { Duration } from 'date-fns';
import { durationToSeconds } from './duration-to-seconds.ts';
import { secondsToDuration } from './seconds-to-duration.ts';

/**
 * Subtracts two durations and returns the result as a Duration object.
 *
 * @param duration1 - The first duration to subtract from.
 * @param duration2 - The second duration to subtract.
 *
 * @return The resulting duration after subtraction.
 */
export function subtractDurations(duration1: Duration, duration2: Duration) {
    const seconds1 = durationToSeconds(duration1);
    const seconds2 = durationToSeconds(duration2);
    const result = seconds1 - seconds2;
    return secondsToDuration(result);
}