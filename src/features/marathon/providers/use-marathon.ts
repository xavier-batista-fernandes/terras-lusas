import { useContext } from 'react';
import { MarathonContext } from './marathon-context.ts';

export function useMarathon() {
    const context = useContext(MarathonContext);
    if (!context) throw new Error('useMarathon must be used within a MarathonProvider');
    return context;
}