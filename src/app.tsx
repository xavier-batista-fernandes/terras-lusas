import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/home.tsx';
import { Daily } from './pages/daily/daily.tsx';
import { MunicipalitiesProvider } from './providers/municipalities-provider.tsx';
import { MarathonGame } from './pages/marathon-game/marathon-game.tsx';


export const App = () => {

    return (
        <>
            <MunicipalitiesProvider>
                <BrowserRouter basename={'/TERRAS-LUSAS'}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/daily" element={<Daily />} />
                        <Route path="/marathon" element={<MarathonGame />} />
                    </Routes>
                </BrowserRouter>
            </MunicipalitiesProvider>
        </>
    );
};

