import { IconProps } from './icon.props.ts';

export function ArrowLeftIcon({ fill = 'none', stroke = 'white', strokeWidth = 10 }: IconProps) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <polyline
                points="244 400 100 256 244 112"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
            <line
                x1="120"
                y1="256"
                x2="412"
                y2="256"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
