import './marathon-game.css';
import { useEffect, useState } from 'react';
import { useMunicipalities } from '../../providers/municipalities-provider.tsx';
import { Container } from '../../components/atoms/container/container.tsx';
import { Text } from '../../components/atoms/text/text.tsx';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { useMap } from '../../hooks/useMap.ts';
import { CountdownUpdates, useCountdown } from '../../hooks/useCountdown.ts';
import { Fill, Stroke, Style } from 'ol/style';

export enum gameStates {
    NOT_STARTED,
    ON_GOING,
    GAME_OVER
}

const GAME_DURATION_IN_SECONDS = 30;

export const MarathonGame = () => {

    // Load game dependencies
    // 1. Municipalities
    // 2. Map
    const municipalitiesContext = useMunicipalities();
    const { mapElement, mapFeatures } = useMap();

    const [gameState, setGameState] = useState(gameStates.NOT_STARTED);
    const [correctMunicipalities, setCorrectMunicipalities] = useState(new Set<string>());
    const {
        remainingTime,
        updateState
    } = useCountdown(GAME_DURATION_IN_SECONDS, () => setGameState(gameStates.GAME_OVER));

    // Create a timer to keep track of the remaining time
    useEffect(() => {
        if (gameStates.ON_GOING !== gameState) return;
        updateState(CountdownUpdates.START);
    }, [gameState]);

    function evaluateAnswer(input: string) {
        if (!mapFeatures || mapFeatures.length === 0) {
            console.log('No municipalities available.');
            return;
        }

        const guessedMunicipality = mapFeatures.find(
            (feature) => feature.getProperties()['con_name_lower'] === input.toLowerCase()
        );

        if (!guessedMunicipality) {
            console.log('What you guessed is not even a municipality...');
            return;
        }

        if (correctMunicipalities.has(input)) {
            console.log('You already guessed this one...');
            return;
        }

        // Create new set with the correct municipalities
        setCorrectMunicipalities(new Set([...correctMunicipalities, input]));

        // Update styles of the guessed municipality
        guessedMunicipality.setStyle(
            new Style({
                fill: new Fill({ color: getRandomColor() }),
                stroke: new Stroke({ width: 1 }),
                zIndex: 10
            })
        );
    }

    function getRandomColor() {
        const CORRECT_GUESS_COLORS = ['#53b565', '#69a545', '#a7c957', '#a2df47', '#adc178'];
        return CORRECT_GUESS_COLORS[Math.floor(Math.random() * CORRECT_GUESS_COLORS.length)];
    }


    function handleKeyDown(event: any) {
        if (event.key !== 'Enter') return;

        const input = event.target.value.trim().toLowerCase();

        if (input) evaluateAnswer(input);

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
