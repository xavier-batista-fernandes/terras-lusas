import './marathon.css';
import { GameStates } from '../../models/game-states.ts';
import { useMarathon } from '../../providers/marathon-provider.tsx';
import { MarathonRunning } from './marathon-running.tsx';
import { MarathonResults } from './marathon-results.tsx';
import { MarathonStart } from './marathon-start.tsx';
import { MarathonFlyout } from '../../components/organisms/flyouts/marathon-flyout/marathon-flyout.tsx';

export const Marathon = () => {

    const { gameState } = useMarathon();

    return <>
        <MarathonFlyout />
        {gameState === GameStates.NOT_STARTED && <MarathonStart />}
        {gameState === GameStates.IN_PROGRESS && <MarathonRunning />}
        {gameState === GameStates.FINISHED && <MarathonResults />}
    </>;
};
