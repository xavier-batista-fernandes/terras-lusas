import './marathon-page.css';
import { GameStates } from '../../../core/models/game-states.ts';
import { useMarathon } from '../providers/marathon-provider.tsx';
import { MarathonRunning } from '../components/organisms/marathon-running.tsx';
import { MarathonResults } from '../components/organisms/marathon-results.tsx';
import { MarathonStart } from '../components/organisms/marathon-start.tsx';
import { MarathonFlyout } from '../components/molecules/marathon-flyout/marathon-flyout.tsx';

export const MarathonPage = () => {

    const { gameState } = useMarathon();

    return <>
        <MarathonFlyout />
        {gameState === GameStates.NOT_STARTED && <MarathonStart />}
        {gameState === GameStates.IN_PROGRESS && <MarathonRunning />}
        {gameState === GameStates.FINISHED && <MarathonResults />}
    </>;
};
