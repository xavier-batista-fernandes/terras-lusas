import { ReactNode } from 'react';

export interface HomeButtonProps {
    children: ReactNode;

    isDisabled?: boolean;
    onClick: () => void;

    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    width?: string;
    margin?: string;
}
