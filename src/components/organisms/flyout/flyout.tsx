import { FlyoutProps } from './flyout.props';
import { useEffect, useState } from 'react';
import './flyout.css';
import { HomeButton } from '../../atoms/buttons/home-button/home-button.tsx';

export function Flyout({ onClose }: FlyoutProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={'flyout-backdrop'}>
            <div className={`flyout-container ${isMounted ? 'open' : ''}`}>
                Flyout
                <HomeButton onClick={onClose}>Fechar</HomeButton>
            </div>
        </div>);
}