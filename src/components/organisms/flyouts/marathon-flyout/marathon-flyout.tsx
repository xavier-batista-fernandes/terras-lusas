import { Flyout } from '../../../molecules/flyout/flyout.tsx';
import { FlyoutProps } from './marathon-flyout.props.ts';
import { useMunicipalities } from '../../../../providers/municipalities-provider.tsx';
import './marathon-flyout.css';

export function MarathonFlyout({ isOpen }: FlyoutProps) {
    const { districts } = useMunicipalities();

    return (
        <Flyout isOpen={isOpen}>
            <h1>CONCELHOS POR DISTRITO</h1>
            <p>Aqui podes ver que concelhos já acertaste por distrito.</p>

            <ul className="marathon-flyout-container">
                {Array.from(districts).map((district) =>
                    <li key={district} className="marathon-flyout-item">{district}</li>)}
            </ul>
        </Flyout>
    );
}