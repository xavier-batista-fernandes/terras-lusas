import './marathon-flyout.css';
import { useMunicipalities } from '../../../../providers/municipalities-provider.tsx';
import { useMarathon } from '../../../../providers/marathon-provider.tsx';
import { useEffect } from 'react';
import { toTitleCase } from '../../../../utilities/toTitleCase.ts';
import { useFlyout } from '../../../../providers/flyout-context/flyout-provider.tsx';


// TODO: extract marathon flyout content to separate content component (molecule?) (no flyout, just the table?)
// TODO: render only that component in mobile view, forget the map
export function MarathonFlyout() {
    const { districts, municipalitiesPerDistrict } = useMunicipalities();
    const { guessedMunicipalities, lastDistrict } = useMarathon();
    const { isFlyoutOpen, openFlyout, closeFlyout } = useFlyout();

    useEffect(() => {
        document.onkeydown = (event) => {
            console.log('event', isFlyoutOpen);
            if (event.key === 'Shift' && !isFlyoutOpen) openFlyout();
            if (event.key === 'Shift' && isFlyoutOpen) closeFlyout();
            if (event.key === 'Escape') closeFlyout();
        };
    }, [isFlyoutOpen]);

    useEffect(() => {
        if (!lastDistrict) return;

        const target = toTitleCase(lastDistrict);
        console.log('target', target);
        const element = document.querySelector(`[data-district="${target}"]`);
        element?.scrollIntoView({ behavior: 'smooth', 'block': 'center' });

    }, [lastDistrict]);


    return (
        <div className={`marathon-flyout-container ${isFlyoutOpen ? 'open' : ''}`}>
            <div className={'marathon-flyout-content'}>
                <h1>CONCELHOS POR DISTRITO</h1>
                <p>Acompanha o teu progresso na Maratona. Aqui podes consultar quais munícipios já acertaste em cada um
                    dos distritos.</p>
                <button onClick={() => closeFlyout()}>X</button>

                <ul className="marathon-flyout-districts-list">
                    {Array.from(districts).map((district) =>
                        <li key={district}
                            data-district={district}
                            className="marathon-flyout-districts-item"
                        >
                            <h2>{district}</h2>
                            <ul className="marathon-flyout-municipalities-list">
                                {Array.from(municipalitiesPerDistrict.get(district)!.values()).map(
                                    municipality =>
                                        <li key={municipality}
                                            data-municipality={municipality}
                                            className="marathon-flyout-municipalities-item"
                                        >
                                            {guessedMunicipalities.has(municipality.toLowerCase()) && municipality}
                                        </li>,
                                )}
                            </ul>
                        </li>)}
                </ul>
            </div>
        </div>
    );
}