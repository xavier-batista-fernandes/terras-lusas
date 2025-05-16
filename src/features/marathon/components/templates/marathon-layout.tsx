import './marathon-layout.css';
import { MarathonProvider } from '../../providers/marathon-provider.tsx';
import { Outlet } from 'react-router-dom';

export function MarathonLayout() {
    return (
        <MarathonProvider>
            <div className="marathon-layout-container">
                <Outlet />
            </div>
        </MarathonProvider>
    );
}