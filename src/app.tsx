import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Explore } from './core/pages/explore/explore.tsx';
import { NotFound } from './core/pages/not-found/not-found.tsx';
import { MarathonLayout } from './features/marathon/components/templates/marathon-layout.tsx';
import { MarathonResults } from './features/marathon/components/organisms/results/marathon-results.tsx';
import { MarathonStatistics } from './features/marathon/components/organisms/statistics/marathon-statistics.tsx';
import { MarathonHistory } from './features/marathon/components/organisms/history/marathon-history.tsx';
import { MarathonPlay } from './features/marathon/components/organisms/play/marathon-play.tsx';
import { MarathonPage } from './features/marathon/components/pages/marathon-page.tsx';

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/marathon" replace />} />
                    <Route path="/marathon" element={<MarathonLayout />}>
                        <Route index element={<MarathonPage />} />
                        <Route path="play" element={<MarathonPlay />} />
                        <Route path="statistics" element={<MarathonStatistics />} />
                        <Route path="history" element={<MarathonHistory />} />
                        <Route path="results/:id" element={<MarathonResults />} />
                    </Route>
                    <Route path="/explore" element={<Explore />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

