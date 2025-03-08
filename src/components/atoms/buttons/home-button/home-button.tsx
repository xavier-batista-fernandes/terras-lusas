import './home-button.css';
import { HomeButtonProps } from './home-button.props.ts';
import { FC } from 'react';

export const HomeButton: FC<HomeButtonProps> = ({
    children,
    primaryColor = '#efefef',
    secondaryColor = '#e6e6e6',
    fontSize = '1.25rem',
    width,
    margin,
    onClick,
}) => {
    const buttonColors = {
        '--primary-color': primaryColor,
        '--secondary-color': secondaryColor,
    };

    return (
        <button
            onClick={onClick}
            style={{ ...buttonColors, fontSize, width, margin }}
        >
            {children}
        </button>
    );
};
