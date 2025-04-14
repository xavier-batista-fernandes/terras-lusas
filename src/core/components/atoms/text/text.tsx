import './text.css';
import { TextProps } from './text.props.ts';
import { FC } from 'react';

export const Text: FC<TextProps> = ({
    children,
    color = 'black',
    fontFamily = 'inherit',
    fontSize,
    fontWeight,
    fontStyle,
    margin = '0',
    padding = '0',
    textAlign = 'start',
    display,
    visibility,
}) => {
    return (
        <p
            style={{
                color,
                fontFamily,
                fontSize,
                fontWeight,
                fontStyle,
                margin,
                padding,
                textAlign,
                display,
                visibility,
            }}
        >
            {children}
        </p>
    );
};
