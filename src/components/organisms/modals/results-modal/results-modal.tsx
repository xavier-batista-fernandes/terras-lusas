import './results-modal.css';
import { Text } from '../../../atoms/text/text.tsx';
import { HomeButton } from '../../../atoms/buttons/home-button/home-button.tsx';
import { useEffect, useState } from 'react';
import { ResultsModalProps } from './results-modal.props.ts';

export function ResultsModal({ children, onClose }: ResultsModalProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className={'modal-backdrop'}>
            <div className={`modal-container ${isMounted ? 'open' : ''}`}>
                <div className={'modal-header'}>
                    <Text fontSize="clamp(16px, 2.5rem, 36px)" fontWeight="bold" color="#1a1a1a">O tempo esgotou-se!
                        🎉</Text>
                    <HomeButton onClick={onClose}>X</HomeButton>
                </div>
                <div className={'modal-content'}>
                    {children}
                </div>
                <div className={'modal-footer'}>
                    <HomeButton onClick={onClose}>Sair</HomeButton>
                </div>
            </div>
        </div>
    );
}
