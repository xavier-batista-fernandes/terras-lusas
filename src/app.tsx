import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/home/home.tsx';


export const App = () => {

    return (
        <>
            <BrowserRouter basename={'/TERRAS-LUSAS'}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/*<Route path="/daily" element={<Daily />} />*/}
                </Routes>
            </BrowserRouter>
        </>
    );
};

