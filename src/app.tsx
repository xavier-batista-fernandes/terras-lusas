import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/home.tsx';
import { MunicipalitiesProvider } from './providers/municipalities-provider.tsx';
import { Marathon } from './pages/marathon/marathon.tsx';
import { Explore } from './pages/explore/explore.tsx';


export const App = () => {

    return (
        <>
            <MunicipalitiesProvider>
                <BrowserRouter basename={'/TERRAS-LUSAS'}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/marathon" element={<Marathon />} />
                        <Route path="/explore" element={<Explore />} />
                    </Routes>
                </BrowserRouter>
            </MunicipalitiesProvider>
        </>
    );
};

