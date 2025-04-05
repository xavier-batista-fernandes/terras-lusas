import './marathon-running.css';
import { useMap } from '../../hooks/useMap.ts';
import { useMarathon } from '../../providers/marathon-provider.tsx';
import { useRef, useState } from 'react';
import { Text } from '../../components/atoms/text/text.tsx';
import { UnderlinedTextInput } from '../../components/molecules/inputs/underlined-text-input/underlined-text-input.tsx';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { MarathonFlyout } from '../../components/organisms/flyouts/marathon-flyout/marathon-flyout.tsx';

export function MarathonRunning() {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const { paintMunicipality } = useMap(mapElement);
    const {
        remainingTime,
        isGuessValid,
        isGuessRepeated,
        isGuessCorrect,
        markCorrect,
    } = useMarathon();

    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    const [latestGuess, setLatestGuess] = useState('');

    const isRepeated = isGuessRepeated(latestGuess);

    function closeFlyout() {
        setIsFlyoutOpen(false);
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

    return <>
        <div className={'marathon-running-container'}>
            <div className={'actions'}>
                <MarathonFlyout isOpen={isFlyoutOpen} onClose={closeFlyout} />
                <p>{remainingTime}</p>
                <UnderlinedTextInput onChange={handleChange} onKeyDown={handleKeyDown} />
                <Text fontSize="0.75rem" margin={'2%'} color="red" visibility={isRepeated ? 'visible' : 'hidden'}>
                    Já adivinhaste este.
                </Text>
                <HomeButton onClick={() => setIsFlyoutOpen(!isFlyoutOpen)}>
                    {isFlyoutOpen ? 'Fechar detalhes' : 'Abrir detalhes'}
                </HomeButton>
            </div>
            <div className={'map'} ref={mapElement}></div>
        </div>
    </>;
}