import { Duration } from 'date-fns';

/**
 * Converts a Duration object to total seconds.
 * Ignores years, months, weeks and days.
 *
 * @param hours - The number of hours.
 * @param minutes - The number of minutes.
 * @param seconds - The number of seconds.
 *
 * @returns The total duration in seconds.
 */
export function durationToSeconds({ hours = 0, minutes = 0, seconds = 0 }: Duration) {
    return hours * 3600 + minutes * 60 + seconds;
}