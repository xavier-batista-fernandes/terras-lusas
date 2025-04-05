import './marathon.css';
import { GameStates } from '../../models/game-states.ts';
import { useMarathon } from '../../providers/marathon-provider.tsx';
import { MarathonRunning } from './marathon-running.tsx';
import { MarathonFinished } from './marathon-finished.tsx';
import { MarathonStart } from './marathon-start.tsx';

export const Marathon = () => {

    const { gameState } = useMarathon();

    return <>
        {gameState === GameStates.NOT_STARTED && <MarathonStart />}
        {gameState === GameStates.IN_PROGRESS && <MarathonRunning />}
        {gameState === GameStates.FINISHED && <MarathonFinished />}
    </>;
};
