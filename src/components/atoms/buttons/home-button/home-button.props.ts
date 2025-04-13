import { ReactNode, SyntheticEvent } from 'react';

export interface HomeButtonProps {
    children: ReactNode;

    isDisabled?: boolean;
    onClick?: (event: SyntheticEvent) => void;

    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    width?: string;
    margin?: string;
}
