import './results-modal.css';
import { Text } from '../../../atoms/text/text.tsx';
import { SecondaryButton } from '../../../atoms/buttons/primary-button/primary-button.tsx';
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
                    <SecondaryButton onClick={onClose}>X</SecondaryButton>
                </div>
                <div className={'modal-content'}>
                    {children}
                </div>
                <div className={'modal-footer'}>
                    <SecondaryButton onClick={onClose}>Sair</SecondaryButton>
                </div>
            </div>
        </div>
    );
}
