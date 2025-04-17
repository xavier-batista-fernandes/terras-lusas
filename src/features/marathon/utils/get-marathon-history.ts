import { MarathonStatistics } from '../models/marathon-statistics.ts';

export function getMarathonHistory(): MarathonStatistics[] {
    const rawData = window.localStorage.getItem('marathonHistory');
    return rawData ? JSON.parse(rawData) : [];
}