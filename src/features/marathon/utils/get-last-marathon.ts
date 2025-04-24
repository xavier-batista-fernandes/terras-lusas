import { MarathonStatistics } from '../models/marathon-statistics.ts';

/**
 * Get the last marathon statistics from local storage.
 *
 * @returns The last marathon statistics.
 */
export function getLastMarathon(): MarathonStatistics {
    const raw = window.localStorage.getItem('marathon:history:v1');
    const history = raw ? JSON.parse(raw) : [];
    return history.pop();
}