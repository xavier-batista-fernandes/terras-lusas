import './marathon-page.css';
import { HomeButton } from '../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useNavigate } from 'react-router-dom';

export function MarathonPage() {
    const navigate = useNavigate();

    function onStartClick() {
        navigate('/marathon/play');
    }

    function onStatisticsClick() {
        navigate('/marathon/statistics');
    }

    function onHistoryClick() {
        navigate('/marathon/history');
    }

    return <div className={'marathon-page'}>
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