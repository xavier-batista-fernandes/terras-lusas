import { getMarathonHistory } from './get-marathon-history.ts';
import { MarathonStatistics } from '../models/marathon-statistics.ts';

export function addToMarathonHistory(stats: MarathonStatistics) {
    const oldHistory = getMarathonHistory();
    const newHistory = [...oldHistory, stats];
    window.localStorage.setItem('marathonHistory', JSON.stringify(newHistory));
}
