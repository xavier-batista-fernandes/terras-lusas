import { IconProps } from './icon.props.ts';

export function IconTwo({ fill = 'none', stroke = 'white', strokeWidth = 10 }: IconProps) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <polyline
                points="416 128 192 384 96 288"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
