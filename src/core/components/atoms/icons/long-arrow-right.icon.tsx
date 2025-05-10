import { IconProps } from '../../../models/icon.props.ts';

export function LongArrowRightIcon({ fill = 'none', stroke = '#000000', strokeWidth = 32 }: IconProps) {
    return (
        <svg
            height="100%"
            width="auto"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <polyline
                points="400 352 464 288 400 224"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth={strokeWidth}
            />
            <polyline
                points="448 288 48 288"
                fill={fill}
                stroke={stroke}
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
