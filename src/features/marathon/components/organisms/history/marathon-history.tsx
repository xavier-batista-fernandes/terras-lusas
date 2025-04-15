import './marathon-history.css';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useMarathon } from '../../../providers/marathon-provider.tsx';
import { GameStates } from '../../../../../core/models/game-states.ts';

export function MarathonHistory() {
    const { setGameState } = useMarathon();
    return (
        <div className="marathon-history">
            <div className="header">
                <img src="/assets/icons/receipt-sharp-svgrepo-com.svg" alt="An icon of a bar chart." />
                <div className="title">
                    <h1>Histórico de Maratonas</h1>
                    <p>Recorda todos as maratonas que já jogaste.</p>
                </div>

            </div>

            <div className="history">
                <div className="card">
                    <h2>Maratona #2</h2>
                    <img src="/assets/icons/chevron-down-sharp-svgrepo-com.svg"
                         alt="A chevron arrow pointing downwards." />
                </div>
                <div className="card">
                    <h2>Maratona #1</h2>
                    <img src="/assets/icons/chevron-down-sharp-svgrepo-com.svg"
                         alt="A chevron arrow pointing downwards." />
                </div>
            </div>

            <div className="actions">
                <HomeButton onClick={() => setGameState(GameStates.NOT_STARTED)}>
                    Voltar
                </HomeButton>
            </div>
        </div>
    );
}
