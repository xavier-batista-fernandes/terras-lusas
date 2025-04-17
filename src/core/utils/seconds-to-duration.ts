import { intervalToDuration } from 'date-fns';

/**
 * Converts seconds to a Duration object.
 *
 * @param seconds - The number of seconds to convert.
 *
 * @returns A Duration object with the equivalent time.
 */
export function secondsToDuration(seconds: number) {
    return intervalToDuration({ start: 0, end: seconds * 1000 });
}