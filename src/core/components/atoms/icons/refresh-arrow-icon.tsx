import { IconProps } from '../../../models/icon.props.ts';

export function RefreshArrowIcon({ fill = 'none', stroke = '#000000', strokeWidth = 32 }: IconProps) {
    return (
        <svg
            height="100%"
            width="100%"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Refresh Arrow</title>
            <path
                d="M320,146s24.36-12-64-12A160,160,0,1,0,416,294"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth={strokeWidth}
            />
            <polyline
                points="256 58 336 138 256 218"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
