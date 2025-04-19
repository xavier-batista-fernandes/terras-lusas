import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MarathonPage } from './features/marathon/pages/marathon-page.tsx';
import { Explore } from './core/pages/explore/explore.tsx';
import { MarathonProvider } from './features/marathon/providers/marathon-provider.tsx';
import { FlyoutProvider } from './core/providers/flyout-context/flyout-provider.tsx';
import { NotFound } from './core/pages/not-found/not-found.tsx';
import { MunicipalitiesProvider } from './core/providers/municipalities-context/municipalities-provider.tsx';

export const App = () => {
    return (
        <>
            <MunicipalitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/marathon" replace />} />
                        <Route
                            path="/marathon"
                            element={
                                <MarathonProvider>
                                    <FlyoutProvider>
                                        <MarathonPage />
                                    </FlyoutProvider>
                                </MarathonProvider>
                            } />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </MunicipalitiesProvider>
        </>
    );
};

