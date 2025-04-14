import './marathon-statistics.css';
import { useMetrics } from '../../../hooks/useMetrics.ts';
import { HomeButton } from '../../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useMarathon } from '../../../providers/marathon-provider.tsx';
import { GameStates } from '../../../../../core/models/game-states.ts';

export function MarathonStatistics() {
    const {
        getNumberMarathonsPlayed,
        getBestScore,
        getAverageScore,
        getNumberUnknownMunicipalities,
        getNumberUnknownMunicipalitiesPerDistrict,
        getNumberCompleteDistricts,
    } = useMetrics();
    const { setGameState } = useMarathon();

    const marathonsPlayed = getNumberMarathonsPlayed();
    const bestScore = getBestScore();
    const averageScore = getAverageScore();
    const unknownMunicipalities = getNumberUnknownMunicipalities();
    const lisboaComplete = getNumberUnknownMunicipalitiesPerDistrict('Lisboa') === 0;
    const completeDistricts = getNumberCompleteDistricts();
    // TODO: makes this component have cards with icons, minimalistic front page design
    // TODO: then move into a more detailed section (map of portugal with districts, etc)
    return (
        <div className="marathon-stats__container">
            <h1 className="marathon-stats__title">📊 Estatísticas da Maratona</h1>

            <div className="marathon-stats__grid">
                <div className="marathon-stats__card">
                    <h2>🎮 Jogadas</h2>
                    <p>Participaste em {marathonsPlayed} maratonas. Continua assim!</p>
                </div>

                <div className="marathon-stats__card">
                    <h2>🏆 Recorde</h2>
                    <p>A tua melhor pontuação foi {bestScore} municípios certos. Brutal! 🔥</p>
                </div>

                <div className="marathon-stats__card">
                    <h2>📈 Média</h2>
                    <p>Estás a acertar em média {averageScore} municípios por jogo.</p>
                </div>

                <div className="marathon-stats__card">
                    <h2>🕵️‍♂️ Por descobrir</h2>
                    <p>Ainda tens {unknownMunicipalities} concelhos por explorar. Bora lá!</p>
                </div>

                <div className="marathon-stats__card">
                    <h2>🧭 Lisboa completa?</h2>
                    <p>{lisboaComplete ? 'Sim! Conheces aquilo tudo. 🎯' : 'Ainda não! Vai lá terminar isso. 💼'}</p>
                </div>

                <div className="marathon-stats__card">
                    <h2>📍 Distritos concluídos</h2>
                    <p>Já fechaste {completeDistricts} distritos. Grande!. 💪</p>
                </div>
            </div>

            <div className="marathon-stats__button">
                <HomeButton onClick={() => setGameState(GameStates.NOT_STARTED)}>
                    🔙 Voltar ao início
                </HomeButton>
            </div>
        </div>
    );
}
