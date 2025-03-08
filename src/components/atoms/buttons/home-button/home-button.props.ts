import { ReactNode } from 'react';

export interface HomeButtonProps {
    children: ReactNode;
    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    width?: string;
    margin?: string;
    onClick: () => void;
}
