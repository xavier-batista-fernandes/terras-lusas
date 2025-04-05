import './marathon.css';
import { useState } from 'react';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import { useMap } from '../../hooks/useMap.ts';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { Loading } from '../../components/molecules/loading/loading.tsx';
import { UnderlinedTextInput } from '../../components/molecules/inputs/underlined-text-input/underlined-text-input.tsx';
import { ResultsModal } from '../../components/organisms/modals/results-modal/results-modal.tsx';
import { MarathonFlyout } from '../../components/organisms/flyouts/marathon-flyout/marathon-flyout.tsx';
import { useMarathon } from '../../hooks/useMarathon.ts';
import { GameStates } from '../../models/game-states.ts';

export const Marathon = () => {

    const { isLoading, mapElement, paintMunicipality } = useMap();
    const {
        remainingTime,
        setGameState,
        gameState,
        guessedMunicipalities,
        isGuessValid,
        isGuessRepeated,
        isGuessCorrect,
        markCorrect,
        marathonStart,
    } = useMarathon();

    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const [latestGuess, setLatestGuess] = useState('');

    const isRepeated = isGuessRepeated(latestGuess);


    function closeFlyout() {
        setIsFlyoutOpen(false);
    }

    function closeResultsModal() {
        setGameState(GameStates.NOT_STARTED);
    }

    function handleKeyDown(event: any) {
        if (event.key !== 'Enter') return;
        event.target.value = '';
    }

    function handleChange(event: any) {
        const input = event.target.value.trim().toLowerCase();
        setLatestGuess(input);

        if (!input) return;

        if (!isGuessValid(input)) return;
        if (isGuessRepeated(input)) return;

        if (isGuessCorrect(input)) {
            markCorrect(input);
            paintMunicipality(input);
        }

        event.target.value = '';
        setLatestGuess('');
    }

    function onStartClick() {
        marathonStart();
    }

    return (<>
            {/* Loading component... */}
            {isLoading && <Loading />}


            {/* Content... */}
            <div className={'marathon-page-container'}>
                {gameState === GameStates.NOT_STARTED &&
                    <div className={'marathon-page-section-start'}>
                        <h1>Maratona de Municípios</h1>
                        <p>Quantos municípios consegues adivinhar antes que o tempo acabe?</p>
                        <ul>
                            <li>🧠 Tens 3 minutos.</li>
                            <li>📍 Vê os teus acertos no mapa e organiza-os por distrito.</li>
                            <li>🔥 Prepara-te. A corrida começa quando carregares no botão.</li>
                        </ul>
                        <div className={'actions'}>
                            <HomeButton onClick={onStartClick}>
                                Vamos!
                            </HomeButton>
                        </div>
                    </div>
                }

                {gameState === GameStates.IN_PROGRESS &&
                    <>
                        <div className={'marathon-page-section-running'}>
                            <Text fontSize="3rem" fontWeight="bold">{remainingTime} ⏳</Text>
                            <Text fontSize="1.75rem" fontWeight="normal">Tens um amigo que é de...</Text>
                            <UnderlinedTextInput onChange={handleChange} onKeyDown={handleKeyDown} />
                            <Text fontSize="0.75rem" color="red" visibility={isRepeated ? 'visible' : 'hidden'}>
                                Já adivinhaste este.
                            </Text>

                            <HomeButton onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}>
                                {isFlyoutOpen ? 'Fechar detalhes' : 'Abrir detalhes'}
                            </HomeButton>
                        </div>
                        <MarathonFlyout isOpen={isFlyoutOpen} onClose={closeFlyout} />
                    </>
                }

                {gameState === GameStates.FINISHED &&
                    <ResultsModal onClose={closeResultsModal}>
                        <Container display={'flex'} justifyContent={'center'}
                                   flexDirection={'column'}>
                            <Text fontSize={'clamp(12px, 1.5rem, 26px)'}>
                                Conseguiste escrever {guessedMunicipalities.size} concelhos. Boa pá!
                            </Text>
                        </Container>
                    </ResultsModal>}

                <div className={'marathon-page-map' + `${gameState !== GameStates.IN_PROGRESS ? 'hidden' : ''}`}>
                    <div
                        className={gameState !== GameStates.IN_PROGRESS ? ' hidden' : ''}
                        id="map"
                        ref={mapElement}
                        data-hidden={gameState !== GameStates.IN_PROGRESS}>
                    </div>
                </div>
            </div>
        </>
    );
};