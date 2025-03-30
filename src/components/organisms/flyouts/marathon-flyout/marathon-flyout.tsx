import { Flyout } from '../../../molecules/flyout/flyout.tsx';
import { FlyoutProps } from './marathon-flyout.props.ts';
import { useMunicipalities } from '../../../../providers/municipalities-provider.tsx';
import './marathon-flyout.css';
import { useEffect } from 'react';

export function MarathonFlyout({ isOpen }: FlyoutProps) {
    const { districts, municipalities } = useMunicipalities();

    useEffect(() => {
        // TODO: protect component against data not being available
    }, []);

    return (
        <Flyout isOpen={isOpen}>
            <h1>CONCELHOS POR DISTRITO</h1>
            <p>Aqui podes ver que concelhos já acertaste por distrito.</p>

            <div className="marathon-flyout-container">
                <ul className="marathon-flyout-districts-list">
                    {Array.from(districts).map((district) =>
                        <li key={district}
                            className="marathon-flyout-districts-item"
                        >
                            <h2>{district}</h2>
                            <ul className="marathon-flyout-municipalities-list">
                                {Array.from(municipalities.get(district)!.values()).map(municipality =>
                                    <li key={municipality}
                                        className="marathon-flyout-municipalities-item"
                                    >
                                        {municipality}
                                    </li>)}
                            </ul>
                        </li>)}
                </ul>
            </div>
        </Flyout>
    );
}