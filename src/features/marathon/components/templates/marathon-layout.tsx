import { MarathonProvider } from '../../providers/marathon-provider.tsx';
import { Outlet } from 'react-router-dom';
import { FlyoutProvider } from '../../../../core/providers/flyout-context/flyout-provider.tsx';
import { MunicipalitiesProvider } from '../../../../core/providers/municipalities-context/municipalities-provider.tsx';

export function MarathonLayout() {
    return (
        <MunicipalitiesProvider>
            <MarathonProvider>
                <FlyoutProvider>
                    <Outlet />
                </FlyoutProvider>
            </MarathonProvider>
        </MunicipalitiesProvider>
    );
}