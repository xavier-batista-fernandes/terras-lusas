import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/home.tsx';
import { MunicipalitiesProvider } from './providers/municipalities-provider.tsx';
import { Marathon } from './pages/marathon/marathon.tsx';
import { Explore } from './pages/explore/explore.tsx';
import { MarathonProvider } from './providers/marathon-context/marathon-provider.tsx';
import { FlyoutProvider } from './providers/flyout-context/flyout-provider.tsx';
import { NotFound } from './pages/not-found/not-found.tsx';

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
                                        <Marathon />
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

