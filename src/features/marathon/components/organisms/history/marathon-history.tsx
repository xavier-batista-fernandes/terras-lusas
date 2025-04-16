import './marathon-history.css';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useMarathon } from '../../../providers/marathon-provider.tsx';
import { GameStates } from '../../../../../core/models/game-states.ts';
import { getMarathonHistory } from '../../../statistics/get-marathon-history.ts';

export function MarathonHistory() {
    const { setGameState } = useMarathon();

    const isEmpty = getMarathonHistory().length === 0;

    return (
        <div className="marathon-history">
            <div className="header">
                <img src="/assets/icons/receipt-sharp-svgrepo-com.svg" alt="An icon of a bar chart." />
                <div className="title">
                    <h1>Histórico de Maratonas</h1>
                    <p>Recorda todos as maratonas que já jogaste.</p>
                </div>

            </div>

            {isEmpty &&
                <div className="empty-content">
                    <img src="/assets/icons/search-sharp-svgrepo-com.svg"
                         alt="Uma imagem de um gráfico de barras, simbolizando estatísticas." />
                    <div className="title">
                        <h2>Ainda não existem dados</h2>
                        <p>Joga pelo menos uma vez para veres o histórico.</p>
                    </div>
                </div>
            }

            {!isEmpty &&
                <div className="not-empty-container">
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
                </div>}

            <div className="actions">
                <HomeButton onClick={() => setGameState(GameStates.NOT_STARTED)}>
                    Voltar
                </HomeButton>
            </div>
        </div>
    );
}
