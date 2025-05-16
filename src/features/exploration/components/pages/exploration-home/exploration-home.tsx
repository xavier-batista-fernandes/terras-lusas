import './exploration-home.css';
import React, { useRef } from 'react';
import { useMap } from '../../../../../core/hooks/useMap.ts';
import { useMunicipalities } from '../../../../../core/providers/municipalities-context/use-municipalities.ts';

export function ExplorationHome() {
    const mapElement = useRef(null);
    const { setMarkedMunicipalities } = useMap(mapElement);
    const { getMatchingMunicipalityIds } = useMunicipalities();

    function inputChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        console.log(event);
        const input = event.target.value;

        const matchingIds = getMatchingMunicipalityIds(input);
        console.log('matchingIds:', matchingIds);
        setMarkedMunicipalities(matchingIds);
    }

    return (
        <div className="exploration-home-container">
            <div>
                <div>
                    <h1>ExplorationHome works!</h1>
                    <input onChange={inputChangeHandler} />
                </div>
                <div ref={mapElement}></div>
            </div>
        </div>
    );
}