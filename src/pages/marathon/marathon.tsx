import './marathon.css';
import { useEffect, useState } from 'react';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import { useMap } from '../../hooks/useMap.ts';
import { CountdownUpdates, useCountdown } from '../../hooks/useCountdown.ts';
import { Fill, Stroke, Style } from 'ol/style';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { Loading } from '../../components/molecules/loading/loading.tsx';
import { getMunicipalityCenter } from '../../utilities/getMunicipalityCenter.ts';
import { UnderlinedTextInput } from '../../components/molecules/inputs/underlined-text-input/underlined-text-input.tsx';
import { ResultsModal } from '../../components/organisms/modals/results-modal/results-modal.tsx';
import { Flyout } from '../../components/organisms/flyout/flyout.tsx';

export enum gameStates {
    NOT_STARTED,
    IN_PROGRESS,
    GAME_OVER
}

const GAME_DURATION_IN_SECONDS = 180;

export const Marathon = () => {

    // Load hooks
    // 1. Map
    // 2. useNavigate
    const { isLoading, mapElement, mapFeatures, mapView } = useMap();
    // const navigate = useNavigate();

    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    const [correctMunicipalities, setCorrectMunicipalities] = useState(new Set<string>());
    const { remainingTime, updateState } = useCountdown(GAME_DURATION_IN_SECONDS, timeIsUp);

    function timeIsUp() {
        setGameState(gameStates.GAME_OVER);
        updateState(CountdownUpdates.RESET);
    }

    // Create a timer to keep track of the remaining time
    useEffect(() => {
        switch (gameState) {
            case gameStates.IN_PROGRESS:
                updateState(CountdownUpdates.START);
                break;
            case gameStates.GAME_OVER:
                updateState(CountdownUpdates.RESET);
                break;
        }
    }, [gameState]);

    function isMunicipality(input: string) {
        if (!mapFeatures || mapFeatures.length === 0) {
            console.log('No municipalities available.');
            return false;
        }

        const guessedMunicipality = mapFeatures.find(
            (feature) => feature.getProperties()['Municipality'] === input.toUpperCase());

        if (!guessedMunicipality) return false;

        if (correctMunicipalities.has(input)) {
            console.log('You already guessed this one...');
            return false;
        }

        // Create new set with the correct municipalities
        setCorrectMunicipalities(new Set([...correctMunicipalities, input]));

        // Update styles of the guessed municipality
        guessedMunicipality.setStyle(
            new Style({
                fill: new Fill({ color: getRandomColor() }),
                stroke: new Stroke({ width: 1 }),
                zIndex: 10,
            }),
        );

        mapView?.setCenter(getMunicipalityCenter(guessedMunicipality));
        mapView?.setZoom(9);

        return true;
    }

    function closeFlyout() {
        setIsFlyoutOpen(false);
    }

    function closeResultsModal() {
        setGameState(gameStates.NOT_STARTED);
    }

    function getRandomColor() {
        const CORRECT_GUESS_COLORS = ['#53b565', '#69a545', '#a7c957', '#a2df47', '#adc178'];
        return CORRECT_GUESS_COLORS[Math.floor(Math.random() * CORRECT_GUESS_COLORS.length)];
    }

    function handleKeyDown(event: any) {
        if (event.key !== 'Enter') return;
        event.target.value = '';
    }

    function handleChange(event: any) {
        const input = event.target.value.trim().toLowerCase();
        if (!input) return;
        if (isMunicipality(input)) event.target.value = '';
    }


    return (<>
            {/* Loading component... */}
            {isLoading && <Loading />}
            {isFlyoutOpen && <Flyout onClose={closeFlyout} />}

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
                        <HomeButton onClick={() => setGameState(gameStates.IN_PROGRESS)}>
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
                        <HomeButton onClick={() => setIsFlyoutOpen(true)}>Ver detalhes</HomeButton>
                    </Container>
                )}

                {gameState === gameStates.GAME_OVER &&
                    <ResultsModal onClose={closeResultsModal}>
                        <Container display={'flex'} justifyContent={'center'}
                                   flexDirection={'column'}>
                            <Text fontSize={'clamp(12px, 1.5rem, 26px)'}>
                                Conseguiste escrever {correctMunicipalities.size} concelhos. Boa pá!
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