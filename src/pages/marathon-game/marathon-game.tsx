import './marathon-game.css';
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

export enum gameStates {
    NOT_STARTED,
    IN_PROGRESS,
    GAME_OVER
}

const GAME_DURATION_IN_SECONDS = 120;

export const MarathonGame = () => {

    // Load game dependencies
    // 1. Municipalities
    // 2. Map
    const { isLoading, mapElement, mapFeatures, mapView } = useMap();

    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [correctMunicipalities, setCorrectMunicipalities] = useState(new Set<string>());
    const {
        remainingTime,
        updateState,
    } = useCountdown(GAME_DURATION_IN_SECONDS, () => setGameState(gameStates.GAME_OVER));

    // Create a timer to keep track of the remaining time
    useEffect(() => {
        if (gameStates.IN_PROGRESS !== gameState) return;
        updateState(CountdownUpdates.START);
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
                        <Text fontSize="1.75rem" fontFamily={'monospace'} margin="0 10%"
                              textAlign={'center'}>
                            Pronto?
                        </Text>
                        <HomeButton onClick={() => setGameState(gameStates.IN_PROGRESS)}>
                            Começar 🚀
                        </HomeButton>
                    </Container>
                )}

                {gameState === gameStates.IN_PROGRESS && (
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
                        <Text fontSize="1.5rem">Conseguiste escrever {correctMunicipalities.size} concelhos.</Text>
                    </Container>
                )}

                <Container width="50%">
                    <div id="map" ref={mapElement}></div>
                </Container>
            </Container>
        </>
    );

};
