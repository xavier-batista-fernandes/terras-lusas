import './clock.css';
import { Feature, Map, View } from 'ol';
import { useEffect, useRef, useState } from 'react';
import { Fill, Stroke, Style } from 'ol/style';
import { useGeographic } from 'ol/proj';
import { useMunicipalities } from '../../providers/municipalities-provider.tsx';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { getMunicipalityCenter } from '../../utilities/getMunicipalityCenter.ts';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';

export enum gameStates {
    NOT_STARTED,
    ON_GOING,
    GAME_OVER
}

export const Clock = () => {

    useGeographic();
    const mapElement = useRef(null);
    const mapInstance = useRef<Map | null>(null);
    const municipalitiesContext = useMunicipalities();

    const unselectedStyle = new Style({
        stroke: new Stroke({
            color: 'black',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(211,211,211,0.66)'
        }),
        zIndex: 5
    });


    // Create view
    const view = new View({
        center: [-8, 39.5],
        zoom: 7.25
    });


    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [numberOfCorrectGuesses, setNumberOfCorrectGuesses] = useState(0);
    const DURATION_SECONDS = 5;
    const [remainingTime, setRemainingTime] = useState(DURATION_SECONDS);
    useEffect(() => {
        if (gameStates.ON_GOING !== gameState) return;

        const initialTime = new Date().getTime();
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - initialTime;
            const TIME_LIMIT = DURATION_SECONDS * 1000;
            setRemainingTime(DURATION_SECONDS - Math.floor(elapsedTime / 1000));
            if (elapsedTime > TIME_LIMIT) {
                setGameState(gameStates.GAME_OVER);
                clearInterval(interval);
            }
        }, 100);
    }, [gameState]);

    useEffect(() => {

        if (municipalitiesContext.isLoading) return;

        mapInstance.current = new Map();
        if (!mapElement.current) throw new Error('Map element not found.');

        const geojson = municipalitiesContext.geojson;
        console.log('geojosn', geojson);
        const features = new GeoJSON().readFeatures(geojson);
        const source = new VectorSource({ features });
        const vectorLayer = new VectorLayer({ source });


        // Update style of features
        vectorLayer.setStyle(() => {
            return unselectedStyle;
        });


        mapInstance.current.setTarget(mapElement.current);
        mapInstance.current.setLayers([vectorLayer]);
        mapInstance.current.setView(view);

        return () => {
            console.log('Cleaning up...');

            if (!mapInstance.current) return;
            mapInstance.current.setTarget(undefined);
            mapInstance.current.dispose();
        };
    }, [municipalitiesContext.isLoading]);

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
                    stroke: new Stroke({ width: 2 }),
                    zIndex: 10
                }));
                const center = getMunicipalityCenter(feature);
                // mapInstance.current!.setView(new View({ center, zoom: 8 }));

                const DURATION = 1000;
                view.animate({ center: center, duration: DURATION });
                view.animate({ zoom: 7.75, duration: DURATION / 2 }, { zoom: 8, duration: DURATION / 2 });

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
                            Quantos concelhos consegues lembrar antes do tempo acabar?
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
                        <Text fontSize="1.75rem" fontWeight="normal">Quais terrinhas te lembras?</Text>
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
                                    event.target.value = ''; // Clear input first
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
