import { useMarathon } from '../../../providers/marathon-provider.tsx';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import './marathon-home.css';
import { GameStates } from '../../../../../core/models/game-states.ts';

export function MarathonHome() {
    const { marathonStart, setGameState } = useMarathon();

    function onStartClick() {
        marathonStart();
    }

    function onStatisticsClick() {
        setGameState(GameStates.STATISTICS);
    }

    function onHistoryClick() {
        setGameState(GameStates.HISTORY);
    }

    return <div className={'marathon-home'}>
        <h1>Maratona de Municípios</h1>
        <p>Quantos municípios consegues adivinhar antes que o tempo acabe?</p>
        <div className={'actions'}>
            <HomeButton onClick={onStartClick}>
                Jogar
            </HomeButton>
            <HomeButton onClick={onStatisticsClick}>
                Estatísticas
            </HomeButton>
            <HomeButton onClick={onHistoryClick}>
                Histórico
            </HomeButton>
        </div>
    </div>;
}