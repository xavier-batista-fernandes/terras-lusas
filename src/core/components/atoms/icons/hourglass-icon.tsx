import { IconProps } from '../../../models/icon.props.ts';

export function HourglassIcon({ fill = '#000000', stroke = '#000000', strokeWidth = 32 }: IconProps) {
    return (
        <svg
            height="100%"
            width="auto"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
        >
            <title>Hourglass</title>
            <path
                d="M416,32H96V144L204,256,96,368V480H416V368L308,256,416,144ZM272,224V336l91,96H148l92-96V224l-80-80H352Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
