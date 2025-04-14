import './marathon-running.css';
import { useMarathon } from '../../providers/marathon-provider.tsx';
import { useRef, useState } from 'react';
import { Text } from '../../../../core/components/atoms/text/text.tsx';
import { HomeButton } from '../../../../core/components/atoms/buttons/home-button/home-button.tsx';
import { useFlyout } from '../../../../core/providers/flyout-context/flyout-provider.tsx';
import { UnderlinedTextInput } from '../atoms/underlined-text-input/underlined-text-input.tsx';
import { useMap } from '../../../../core/hooks/useMap.ts';

export function MarathonRunning() {
    const mapElement = useRef<HTMLDivElement | null>(null);
    const { paintMunicipality } = useMap(mapElement);
    const {
        remainingTime,
        getMunicipalityId,
        isGuessRepeated,
        isGuessCorrect,
        markCorrect,
        marathonStop,
    } = useMarathon();
    const { openFlyout } = useFlyout();

    const [isRepeated, setIsRepeated] = useState(false);


    function handleKeyDown(event: any) {
        if (event.key !== 'Enter') return;
        event.target.value = '';
    }

    function handleChange(event: any) {
        const input = event.target.value.trim().toLowerCase();

        const municipalityId = getMunicipalityId(input);
        if (!municipalityId) {
            setIsRepeated(false);
            return;
        }

        if (isGuessRepeated(municipalityId)) {
            setIsRepeated(true);
            return;
        }

        if (isGuessCorrect(municipalityId)) {
            markCorrect(municipalityId);
            paintMunicipality(municipalityId);
        }

        event.target.value = '';
    }

    return <>
        <div className={'marathon-running-container'}>
            <div className={'marathon-running-content'}>
                <p>{remainingTime}</p>
                <UnderlinedTextInput onChange={handleChange} onKeyDown={handleKeyDown} />
                <Text fontSize="0.75rem" margin={'2%'} color="red" visibility={isRepeated ? 'visible' : 'hidden'}>
                    Já adivinhaste este.
                </Text>
                <div className={'actions'}>
                    <HomeButton fontSize={'0.75rem'} onClick={openFlyout}>
                        Abrir detalhes
                    </HomeButton>
                    <HomeButton fontSize={'0.75rem'} onClick={marathonStop}>Desistir</HomeButton>
                </div>
            </div>
            <div className={'map'} ref={mapElement}></div>
        </div>
    </>;
}