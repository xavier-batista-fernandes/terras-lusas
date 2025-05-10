import './root-layout.css';
import { SideNavigation } from '../organisms/side-navigation/side-navigation.tsx';
import { Outlet } from 'react-router-dom';
import { ModalProvider } from '../../providers/modal-context/modal-provider.tsx';

export function RootLayout() {
    return (
        <>
            <SideNavigation />
            <main>
                <ModalProvider>
                    <Outlet />
                </ModalProvider>
            </main>
        </>
    );
}