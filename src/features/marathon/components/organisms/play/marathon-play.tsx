import './marathon-play.css';
import { useEffect, useRef, useState } from 'react';
import { Text } from '../../../../../core/components/atoms/text/text.tsx';
import { useMap } from '../../../../../core/hooks/useMap.ts';
import { SecondaryButton } from '../../../../../core/components/atoms/buttons/secondary-button/secondary-button.tsx';
import { useMarathon } from '../../../providers/use-marathon.ts';
import { RefreshArrowIcon } from '../../../../../core/components/atoms/icons/refresh-arrow-icon.tsx';

export function MarathonPlay() {
    const mapElement = useRef(null);
    const { utilPaintMunicipality, utilJumpToMunicipality, resetView } = useMap(mapElement);
    const {
        remainingTime,
        getMunicipalityId,
        isGuessRepeated,
        isGuessCorrect,
        markCorrect,
        marathonStart,
        marathonStop,
    } = useMarathon();

    const [isRepeated, setIsRepeated] = useState(false);

    useEffect(() => {
        marathonStart();

        function handleBeforeUnload(event: BeforeUnloadEvent) {
            event.preventDefault();
        }

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            console.log('Unmounting MarathonPlay component.');
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


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
            utilPaintMunicipality(municipalityId);
            utilJumpToMunicipality(municipalityId);
        }

        event.target.value = '';
    }

    return (
        <div className="marathon-play-container">
            <div className="actions-container">
                <p>{remainingTime}</p>
                <input onChange={handleChange} onKeyDown={handleKeyDown} />
                <Text fontSize="0.75rem" margin={'2%'} color="red" visibility={isRepeated ? 'visible' : 'hidden'}>
                    Já adivinhaste este.
                </Text>
                <div>
                    <SecondaryButton fontSize={'0.75rem'} onClick={marathonStop}>Desistir</SecondaryButton>
                </div>
            </div>
            <div className="map-container">
                <div ref={mapElement} className={'map'}></div>
                <button onClick={resetView}><RefreshArrowIcon /></button>
            </div>
            {/* TODO: district completion... progress bar? */}
            {/*<div>*/}
            {/*    <div>Lisboa</div>*/}
            {/*    <div>Leiria</div>*/}
            {/*    <div>Pombal</div>*/}
            {/*</div>*/}
        </div>
    );
}