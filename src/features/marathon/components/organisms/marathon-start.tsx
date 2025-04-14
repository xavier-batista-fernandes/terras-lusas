import { useMarathon } from '../../providers/marathon-provider.tsx';
import { HomeButton } from '../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import './marathon-start.css';

export function MarathonStart() {
    const { marathonStart } = useMarathon();

    function onStartClick() {
        marathonStart();
    }

    return <div className={'marathon-start-container'}>
        <h1>Maratona de Municípios</h1>
        <p>Quantos municípios consegues adivinhar antes que o tempo acabe?</p>
        <div className={'actions'}>
            <HomeButton onClick={onStartClick}>
                Vamos!
            </HomeButton>
        </div>
    </div>;
}