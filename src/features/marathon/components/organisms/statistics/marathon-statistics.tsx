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
        getNumberCompleteDistricts,
        getBestMunicipality,
    } = useMetrics();
    const { setGameState } = useMarathon();

    const marathonsPlayed = getNumberMarathonsPlayed();
    const bestScore = getBestScore();
    const averageScore = getAverageScore();
    const unknownMunicipalities = getNumberUnknownMunicipalities();
    const completeDistricts = getNumberCompleteDistricts();
    const bestMunicipality = getBestMunicipality();
    // TODO: makes this component have cards with icons, minimalistic front page design
    // TODO: then move into a more detailed section (map of portugal with districts, etc)

    return (
        <div className="marathon-statistics">
            <div className="header">
                <img src="/assets/icons/bar-chart-sharp-svgrepo-com.svg" alt="An icon of a bar chart." />
                <div className="title">
                    <h1>Estatísticas da Maratona</h1>
                    <p>Acompanha o teu progresso e troféus das várias maratonas.</p>
                </div>
            </div>

            <div className="general-stats">
                <div className="card">
                    {/*TODO: create icon and alt enum or object and import it*/}
                    <div className="title">
                        <img src="/assets/icons/dice-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Jogadas</h2>
                    </div>
                    <p>
                        {marathonsPlayed > 0
                            ? `Participaste em ${marathonsPlayed} maratona${marathonsPlayed > 1 ? 's' : ''}.`
                            : 'Ainda não jogaste nenhuma maratona.'}
                    </p>
                </div>

                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/rocket-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Recorde</h2>
                    </div>
                    <p>
                        {bestScore > 0
                            ? `A tua melhor pontuação foi ${bestScore} municípios certos.`
                            : 'Ainda não jogaste nenhuma maratona.'}
                    </p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/analytics-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Concelhos</h2>
                    </div>
                    <p>
                        {averageScore > 0
                            ? `Acertaste em média ${averageScore.toFixed(2)} municípios por jogo.`
                            : 'Ainda não jogaste nenhuma maratona.'}
                    </p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/telescope-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Por descobrir</h2>
                    </div>
                    <p>
                        {unknownMunicipalities > 0
                            ? `Ainda tens ${unknownMunicipalities} concelhos por explorar.`
                            : `Já exploraste todos os concelho${unknownMunicipalities > 1 ? 's' : ''}!`}
                    </p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/earth-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Distritos</h2>
                    </div>
                    <p>
                        {completeDistricts > 0
                            ? `Já completaste ${completeDistricts} distrito${completeDistricts > 1 ? 's' : ''}.`
                            : 'Ainda não completaste nenhum distrito.'}
                    </p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/sparkles-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Favoritos</h2>
                    </div>
                    <p>
                        {marathonsPlayed > 0
                            ? `Escreveste ${bestMunicipality} nas maratonas 63.24% das vezes.`
                            : 'Ainda não jogaste nenhuma maratona.'}
                    </p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/hand-right-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Desistências</h2>
                    </div>
                    <p>
                        {marathonsPlayed > 0
                            ? `Terminaste antes do tempo 53.86% das vezes.`
                            : 'Ainda não jogaste nenhuma maratona.'}
                    </p>
                </div>
                <div className="card">
                    <div className="title">
                        <img src="/assets/icons/timer-sharp-svgrepo-com.svg" alt="FIXME" />
                        <h2>Duração</h2>
                    </div>
                    <p>
                        {marathonsPlayed > 0
                            ? `Os teus jogos duraram em média 5 minutos e 38 segundos.`
                            : 'Ainda não jogaste nenhuma maratona.'}
                    </p>
                </div>
            </div>
            <div></div>

            <div className="actions">
                <HomeButton onClick={() => setGameState(GameStates.NOT_STARTED)}>
                    Voltar
                </HomeButton>
            </div>
        </div>
    );
}
