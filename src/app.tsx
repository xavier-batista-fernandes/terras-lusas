import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from './core/components/pages/not-found/not-found.tsx';
import { MarathonLayout } from './features/marathon/components/templates/marathon-layout.tsx';
import { MarathonResults } from './features/marathon/components/pages/marathon-results/marathon-results.tsx';
import { MarathonStatistics } from './features/marathon/components/pages/marathon-statistics/marathon-statistics.tsx';
import { MarathonHistory } from './features/marathon/components/pages/marathon-history/marathon-history.tsx';
import { MarathonHome } from './features/marathon/components/pages/marathon-home/marathon-home.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './core/components/pages/error-page/error-page.tsx';
import { useEffect } from 'react';
import { RootLayout } from './core/components/templates/root-layout.tsx';
import { ExplorationHome } from './features/exploration/components/pages/exploration-home/exploration-home.tsx';
import { Home } from './core/components/pages/home/home.tsx';

export const App = () => {
    useEffect(() => {
        // @ts-ignore
        console.log(`Running in ${process.env.NODE_ENV} environment.`);
    }, []);

    return (
        <ErrorBoundary fallback={<ErrorPage />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/marathon" element={<MarathonLayout />}>
                            <Route index element={<MarathonHome />} />
                            <Route path="statistics" element={<MarathonStatistics />} />
                            <Route path="history" element={<MarathonHistory />} />
                            <Route path="results/:id" element={<MarathonResults />} />
                        </Route>
                        <Route path="/exploration" element={<ExplorationHome />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
};
