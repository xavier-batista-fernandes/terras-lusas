import { getMarathonHistory } from './get-marathon-history.ts';
import { MarathonStatistics } from '../models/marathon-statistics.ts';

export function addToMarathonHistory(stats: MarathonStatistics) {
    const marathonHistory = getMarathonHistory();
    const newHistory = [...marathonHistory, stats];
    window.localStorage.setItem('marathonHistory', JSON.stringify(newHistory));
}
