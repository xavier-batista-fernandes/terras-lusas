import './marathon-layout.css';
import { MarathonProvider } from '../../providers/marathon-provider.tsx';
import { Outlet } from 'react-router-dom';
import { FlyoutProvider } from '../../../../core/providers/flyout-context/flyout-provider.tsx';
import { MunicipalitiesProvider } from '../../../../core/providers/municipalities-context/municipalities-provider.tsx';
import { SideNavigation } from '../../../../core/components/organisms/side-navigation/side-navigation.tsx';

export function MarathonLayout() {
    return (
        <MunicipalitiesProvider>
            <MarathonProvider>
                <FlyoutProvider>
                    <div className="marathon-layout-container">
                        <SideNavigation />
                        <main>
                            <Outlet />
                        </main>
                    </div>
                </FlyoutProvider>
            </MarathonProvider>
        </MunicipalitiesProvider>
    );
}