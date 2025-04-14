import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './core/pages/home/home.tsx';
import { MunicipalitiesProvider } from './core/providers/municipalities-context/municipalities-provider.tsx';
import { MarathonPage } from './features/marathon/pages/marathon-page.tsx';
import { Explore } from './core/pages/explore/explore.tsx';
import { MarathonProvider } from './features/marathon/providers/marathon-provider.tsx';
import { FlyoutProvider } from './core/providers/flyout-context/flyout-provider.tsx';
import { NotFound } from './core/pages/not-found/not-found.tsx';

export const App = () => {
    return (
        <>
            <MunicipalitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
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

