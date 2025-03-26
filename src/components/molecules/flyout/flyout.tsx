import { FlyoutProps } from './flyout.props.ts';
import { useEffect, useState } from 'react';
import './flyout.css';

export function Flyout({ children }: FlyoutProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={'flyout-backdrop'}>
            <div className={`flyout-container ${isMounted ? 'open' : ''}`}>
                <div className={'flyout-content'}>
                    {children}
                </div>
            </div>
        </div>
    );
}