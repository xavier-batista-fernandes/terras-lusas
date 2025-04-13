import './marathon-results.css';
import { useMarathon } from '../../providers/marathon-provider.tsx';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { useNavigate } from 'react-router-dom';

export function MarathonResults() {

    const navigate = useNavigate();
    const {
        marathonStart,
        guessedMunicipalities,
    } = useMarathon();

    function getTitle(score: number): string {
        if (score <= 50) return 'Turista da Aldeia 🏘️';
        if (score <= 150) return 'Explorador de Municípios 📍';
        if (score <= 250) return 'Dominador de Distritos 🧭';
        return 'Senhor da Lusitânia 👑';
    }

    return <>
        <div className={'marathon-finished-container'}>
            <div className={'header'}>
                <h1>Resultados</h1>
                <p>{getTitle(guessedMunicipalities.size)}</p>
            </div>
            <div>
                <p>🏆 Final Score: {guessedMunicipalities.size} / 308 municipalities </p>
                <p>⏱️ Time Left: 0:00 </p>
                <p>🔥 Longest Streak: 23</p>
                <p>🪼 Distritos desconhecidos: 34</p>
            </div>
            <div className={'best-districts'}>
                <h2>Melhores distritos:</h2>
                <ol>
                    <li>Braga: 12/14</li>
                    <li>Lisboa: 14/16</li>
                    <li>Faro: 9/16</li>
                </ol>
            </div>
            <div className={'previous-results'}>
                <h3>Resultados anteriores:</h3>
                <p>Último score:</p>
                <p>Melhor score:</p>
            </div>
            <div className={'actions'}>
                <HomeButton fontSize={'0.75rem'} isDisabled={true}>Ver detalhes</HomeButton>
                <HomeButton fontSize={'0.75rem'} onClick={marathonStart}>
                    Jogar novamente
                </HomeButton>
                <HomeButton fontSize={'0.75rem'} onClick={() => navigate('/')}>Sair</HomeButton>
            </div>
        </div>
    </>;
}