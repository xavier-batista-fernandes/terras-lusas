import './clock.css';
import { Feature } from 'ol';
import { useEffect, useState } from 'react';
import { Fill, Stroke, Style } from 'ol/style';
import { useMunicipalities } from '../../providers/municipalities-provider.tsx';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { useMap } from '../../hooks/useMap.ts';

export enum gameStates {
    NOT_STARTED,
    ON_GOING,
    GAME_OVER
}

const GAME_DURATION_IN_SECONDS = 30;

export const Clock = () => {

    const municipalitiesContext = useMunicipalities();

    // Setup map and load it with municipalities
    const { mapElement, mapInstance } = useMap();


    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [numberOfCorrectGuesses, setNumberOfCorrectGuesses] = useState(0);
    const [remainingTime, setRemainingTime] = useState(GAME_DURATION_IN_SECONDS);
    useEffect(() => {
        if (gameStates.ON_GOING !== gameState) return;

        const initialTime = new Date().getTime();
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - initialTime;
            const TIME_LIMIT = GAME_DURATION_IN_SECONDS * 1000;
            setRemainingTime(Math.floor((TIME_LIMIT - elapsedTime) / 1000));
            if (elapsedTime > TIME_LIMIT) {
                setGameState(gameStates.GAME_OVER);
                clearInterval(interval);
            }
        }, 100);
    }, [gameState]);

    function evaluateAnswer(input: string) {

        const greenColors = ['#53b565', '#69a545', '#a7c957', '#a2df47', '#adc178'];
        // TODO: create a map context (sort of a component store).
        const municipalitiesLayer: any = mapInstance.current!.getLayers().getArray()[0];
        const features: Feature[] = municipalitiesLayer.getSource()!.getFeatures();


        for (const feature of features) {
            if (feature.getProperties().Municipality === input.toUpperCase()) {
                setNumberOfCorrectGuesses(numberOfCorrectGuesses + 1);
                feature.setStyle(new Style({
                    fill: new Fill({ color: greenColors[Math.floor(Math.random() * greenColors.length)] }),
                    stroke: new Stroke({ width: 1 }),
                    zIndex: 10
                }));

                // const center = getMunicipalityCenter(feature);
                // mapInstance.current!.setView(new View({ center, zoom: 8 }));

                // const DURATION = 1000;
                // view.animate({ center: center, duration: DURATION });
                // view.animate({ zoom: 7.75, duration: DURATION / 2 }, { zoom: 8, duration: DURATION / 2 });

                return;
            }
        }
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
                <Container width="50%">
                    <div id="map" ref={mapElement}></div>
                </Container>

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
                                borderRadius: '8px',
                                border: '1px solid black',
                                padding: '1% 2%',
                                fontFamily: 'monospace'
                            }}
                            type="text"
                            placeholder="Escreve aqui..."
                            autoFocus
                            onKeyDown={(event: any) => {
                                if (event.key === 'Enter') {
                                    const inputValue = event.target.value.trim();
                                    if (inputValue) {
                                        evaluateAnswer(inputValue);
                                        console.log('key pressed', inputValue);
                                    }
                                    event.target.value = '';
                                }
                            }}
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
            </Container>
        </>
    );

};
