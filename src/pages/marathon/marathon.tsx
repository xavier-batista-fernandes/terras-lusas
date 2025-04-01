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
import { gameStates } from '../../models/game-states.ts';

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


    function closeFlyout() {
        setIsFlyoutOpen(false);
    }

    function closeResultsModal() {
        setGameState(gameStates.NOT_STARTED);
    }

    function handleKeyDown(event: any) {
        if (event.key !== 'Enter') return;
        event.target.value = '';
    }

    function handleChange(event: any) {
        const input = event.target.value.trim().toLowerCase();
        if (!input) return;

        if (!isGuessValid(input)) return;
        if (isGuessRepeated(input)) return;

        if (isGuessCorrect(input)) {
            markCorrect(input);
            paintMunicipality(input);
        }

        event.target.value = '';
    }

    function onStartClick() {
        marathonStart();
    }

    return (<>
            {/* Loading component... */}
            {isLoading && <Loading />}
            <MarathonFlyout isOpen={isFlyoutOpen} onClose={closeFlyout} />

            {/* Content... */}
            <Container
                height="100vh"
                width="100vw"
                display={isLoading ? 'none' : 'flex'}
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                {gameState === gameStates.NOT_STARTED && (
                    <Container
                        width="50%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="15px"
                    >
                        <Text fontSize="1.75rem" margin="0 10%"
                              textAlign={'center'}>
                            Pronto?
                        </Text>
                        <HomeButton onClick={onStartClick}>
                            Começar 🚀
                        </HomeButton>
                    </Container>
                )}

                {(gameState === gameStates.IN_PROGRESS &&
                    <Container
                        width="50%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="15px"
                    >
                        <Text fontSize="3rem" fontWeight="bold">{remainingTime} ⏳</Text>
                        <Text fontSize="1.75rem" fontWeight="normal">Tens um amigo que é de...</Text>
                        <UnderlinedTextInput onChange={handleChange} onKeyDown={handleKeyDown} />

                        <HomeButton onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}>
                            {isFlyoutOpen ? 'Fechar detalhes' : 'Abrir detalhes'}
                        </HomeButton>
                    </Container>
                )}

                {gameState === gameStates.GAME_OVER &&
                    <ResultsModal onClose={closeResultsModal}>
                        <Container display={'flex'} justifyContent={'center'}
                                   flexDirection={'column'}>
                            <Text fontSize={'clamp(12px, 1.5rem, 26px)'}>
                                Conseguiste escrever {guessedMunicipalities.size} concelhos. Boa pá!
                            </Text>
                        </Container>
                    </ResultsModal>}


                <Container width="50%">
                    <div id="map" ref={mapElement}></div>
                </Container>
            </Container>
        </>
    );
};