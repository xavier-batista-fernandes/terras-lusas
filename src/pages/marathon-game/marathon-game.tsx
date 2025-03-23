import './marathon-game.css';
import { useEffect, useState } from 'react';
import { Fill, Stroke, Style } from 'ol/style';
import { useMunicipalities } from '../../providers/municipalities-provider.tsx';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { useMap } from '../../hooks/useMap.ts';
import { CountdownUpdates, useCountdown } from '../../hooks/useCountdown.ts';

export enum gameStates {
    NOT_STARTED,
    ON_GOING,
    GAME_OVER
}

const GAME_DURATION_IN_SECONDS = 30;

export const MarathonGame = () => {

    const municipalitiesContext = useMunicipalities();

    // Setup map and load it with municipalities
    const { mapElement, mapFeatures } = useMap();

    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [numberOfCorrectGuesses, setNumberOfCorrectGuesses] = useState(0);
    const {
        remainingTime,
        updateState
    } = useCountdown(GAME_DURATION_IN_SECONDS, () => setGameState(gameStates.GAME_OVER));

    // Create a timer to keep track of the remaining time
    useEffect(() => {
        if (gameStates.ON_GOING !== gameState) return;
        updateState(CountdownUpdates.START);
    }, [gameState]);

    // Function that evaluates the user's input
    function evaluateAnswer(input: string) {

        const greenColors = ['#53b565', '#69a545', '#a7c957', '#a2df47', '#adc178'];

        for (const feature of mapFeatures!) {
            if (feature.getProperties()['con_name_lower'] === input.toLowerCase()) {
                setNumberOfCorrectGuesses(numberOfCorrectGuesses + 1);
                console.log('updating color...', feature);
                feature.setStyle(new Style({
                    fill: new Fill({ color: greenColors[Math.floor(Math.random() * greenColors.length)] }),
                    stroke: new Stroke({ width: 1 }),
                    zIndex: 10
                }));

                return;
            }
        }
    }

    function handleKeyDown(event: any) {
        if (event.key !== 'Enter') return;

        const inputValue = event.target.value.trim();
        if (inputValue) evaluateAnswer(inputValue);

        event.target.value = '';
    }

    return (<>
            {/* Loading component... */}
            <Container
                height="100vh"
                width="100vw"
                display={municipalitiesContext.isLoading ? 'flex' : 'none'}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                <Text fontSize="2.5rem" fontWeight="bold">⏳ A carregar...</Text>
            </Container>

            {/* Content... */}
            <Container
                height="100vh"
                width="100vw"
                display={municipalitiesContext.isLoading ? 'none' : 'flex'}
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
                        <Text fontSize="1.75rem" fontFamily={'monospace'} margin="0 10%"
                              textAlign={'center'}>
                            Pronto?
                        </Text>
                        <HomeButton onClick={() => setGameState(gameStates.ON_GOING)}>
                            Começar 🚀
                        </HomeButton>
                    </Container>
                )}

                {gameState === gameStates.ON_GOING && (
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
                        <input
                            style={{
                                width: '45%',
                                height: '2.5rem',
                                fontSize: '1.5rem',
                                border: '1px solid black',
                                padding: '1% 2%',
                                fontFamily: 'monospace'
                            }}
                            type="text"
                            placeholder="Escreve aqui..."
                            autoFocus
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                    </Container>
                )}

                {gameState === gameStates.GAME_OVER && (
                    <Container
                        width="50%"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        gap="15px"
                    >
                        <Text fontSize="2rem" fontWeight="bold">
                            O tempo esgotou-se! 🎉
                        </Text>
                        <Text fontSize="1.5rem">Conseguiste escrever {numberOfCorrectGuesses} concelhos.</Text>
                    </Container>
                )}

                <Container width="50%">
                    <div id="map" ref={mapElement}></div>
                </Container>
            </Container>
        </>
    );

};
