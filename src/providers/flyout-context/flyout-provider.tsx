import { createContext, ReactNode, useContext, useState } from 'react';
import { FlyoutContextType } from './flyout-context-type.ts';

const FlyoutContext = createContext<FlyoutContextType | undefined>(undefined);

export function FlyoutProvider({ children }: { children: ReactNode }) {

    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);

    function openFlyout() {
        setIsFlyoutOpen(true);
    }

    function closeFlyout() {
        setIsFlyoutOpen(false);
    }

    return <FlyoutContext.Provider value={{ isFlyoutOpen, openFlyout, closeFlyout }}>
        {children}
    </FlyoutContext.Provider>;
}

export function useFlyout() {
    const context = useContext(FlyoutContext);
    if (!context) throw new Error('useFlyout must be used within a FlyoutProvider');
    return context;
};