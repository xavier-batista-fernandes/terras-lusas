import './marathon-layout.css';
import { MarathonProvider } from '../../providers/marathon-provider.tsx';
import { Outlet } from 'react-router-dom';
import { MunicipalitiesProvider } from '../../../../core/providers/municipalities-context/municipalities-provider.tsx';

export function MarathonLayout() {
    return (
        <MunicipalitiesProvider>
            <MarathonProvider>
                <div className="marathon-layout-container">
                    <Outlet />
                </div>
            </MarathonProvider>
        </MunicipalitiesProvider>
    );
}