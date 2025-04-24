import { MarathonStatistics } from '../models/marathon-statistics.ts';

// TODO: move key to constant
export function getMarathonHistory(): MarathonStatistics[] {
    const rawData = window.localStorage.getItem('marathon:history:v1');
    return rawData ? JSON.parse(rawData) : [];
}