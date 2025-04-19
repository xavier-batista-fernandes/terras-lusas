import './marathon-page.css';
import { GameStates } from '../../../core/models/game-states.ts';
import { useMarathon } from '../providers/marathon-provider.tsx';
import { MarathonRunning } from '../components/organisms/running/marathon-running.tsx';
import { MarathonResults } from '../components/organisms/results/marathon-results.tsx';
import { MarathonHome } from '../components/organisms/start/marathon-home.tsx';
import { MarathonStatistics } from '../components/organisms/statistics/marathon-statistics.tsx';
import { MarathonHistory } from '../components/organisms/history/marathon-history.tsx';

export const MarathonPage = () => {

    const { gameState } = useMarathon();

    return <>
        {gameState === GameStates.NOT_STARTED && <MarathonHome />}
        {gameState === GameStates.IN_PROGRESS && <MarathonRunning />}
        {gameState === GameStates.FINISHED && <MarathonResults />}
        {gameState === GameStates.STATISTICS && <MarathonStatistics />}
        {gameState === GameStates.HISTORY && <MarathonHistory />}
    </>;
};
