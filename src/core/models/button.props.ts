import { ReactNode, SyntheticEvent } from 'react';

export interface ButtonProps {
    children: ReactNode;

    isDisabled?: boolean;
    onClick?: (event: SyntheticEvent) => void;

    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    width?: string;
    margin?: string;
}
