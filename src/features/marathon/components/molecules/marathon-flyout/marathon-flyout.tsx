import './marathon-flyout.css';
import { useMunicipalities } from '../../../../../core/providers/municipalities-context/municipalities-provider.tsx';
import { useMarathon } from '../../../providers/marathon-provider.tsx';
import { useEffect } from 'react';
import { useFlyout } from '../../../../../core/providers/flyout-context/flyout-provider.tsx';


// TODO: extract marathon flyout content to separate content component (molecule?) (no flyout, just the table?)
// TODO: render only that component in mobile view, forget the map
export function MarathonFlyout() {
    const { getDistricts, getDetailsForDistrict } = useMunicipalities();
    const { guessedMunicipalities, lastGuess } = useMarathon();
    const { isFlyoutOpen, openFlyout, closeFlyout } = useFlyout();

    useEffect(() => {
        document.onkeydown = (event) => {
            if (event.key === 'Shift' && !isFlyoutOpen) openFlyout();
            if (event.key === 'Shift' && isFlyoutOpen) closeFlyout();
            if (event.key === 'Escape') closeFlyout();
        };
    }, [isFlyoutOpen]);

    useEffect(() => {
        if (!lastGuess) return;

        const element = document.querySelector(`[data-district="${lastGuess.district}"]`);
        element?.scrollIntoView({ behavior: 'smooth', 'block': 'center' });

    }, [lastGuess]);


    return (
        <div className={`marathon-flyout-container ${isFlyoutOpen ? 'open' : ''}`}>
            <div className={'marathon-flyout-content'}>
                <h1>CONCELHOS POR DISTRITO</h1>
                <p>Acompanha o teu progresso na Maratona. Aqui podes consultar quais munícipios já acertaste em cada um
                    dos distritos.</p>
                <button onClick={() => closeFlyout()}>X</button>

                <ul className="marathon-flyout-districts-list">
                    {getDistricts().map((district) =>
                        <li key={district}
                            data-district={district}
                            className="marathon-flyout-districts-item"
                        >
                            <h2>{district}</h2>
                            <ul className="marathon-flyout-municipalities-list">
                                {getDetailsForDistrict(district).map(
                                    details =>
                                        <li key={details.id}
                                            data-municipality={details.id}
                                            className="marathon-flyout-municipalities-item"
                                        >
                                            {guessedMunicipalities.has(details.id) && details.municipality}
                                        </li>,
                                )}
                            </ul>
                        </li>)}
                </ul>
            </div>
        </div>
    );
}