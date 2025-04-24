import { IconProps } from './icon.props.ts';

export function ArrowRightIcon({ fill = 'none', stroke = 'white', strokeWidth = 14 }: IconProps) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <polyline
                points="268 112 412 256 268 400"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
            <line
                x1="392"
                y1="256"
                x2="100"
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