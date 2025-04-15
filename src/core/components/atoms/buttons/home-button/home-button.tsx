import './home-button.css';
import { HomeButtonProps } from './home-button.props.ts';
import { FC } from 'react';

export const HomeButton: FC<HomeButtonProps> = ({
                                                    children,
                                                    isDisabled = false,
                                                    onClick,
                                                    primaryColor = 'white',
                                                    secondaryColor = '#efefef',
                                                    fontSize = '0.85rem',
                                                    width,
                                                    margin,
                                                }) => {
    const buttonColors = {
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
    };

    return (
        <button
            className={'home-button'}
            disabled={isDisabled}
            onClick={onClick}
            style={{ ...buttonColors, fontSize, width, margin }}
        >
            {children}
        </button>
    );
};
