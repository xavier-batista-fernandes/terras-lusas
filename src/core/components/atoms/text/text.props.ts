import { CSSProperties, ReactNode } from 'react';

export interface TextProps {
    children: ReactNode;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: CSSProperties['fontWeight'];
    fontStyle?: CSSProperties['fontStyle'];
    margin?: CSSProperties['margin'];
    padding?: CSSProperties['padding'];
    textAlign?: CSSProperties['textAlign'];
    display?: CSSProperties['display'];
    visibility?: CSSProperties['visibility'];
}
