import { IconProps } from '../../../models/icon.props.ts';

export function CloseCrossIcon({ fill = 'none', stroke = '#000000', strokeWidth = 32 }: IconProps) {
    return (
        <svg
            height="100%"
            width="100%"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Close Cross</title>
            <polygon
                points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
