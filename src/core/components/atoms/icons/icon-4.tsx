import { IconProps } from './icon.props.ts';

export function IconFour({ fill = 'none', stroke = 'white', strokeWidth = 10 }: IconProps) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M448,16H64L32,176V320H480V176ZM436,176H320a64,64,0,0,1-128,0H76L98,58H414Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <path
                d="M320,352a64,64,0,0,1-128,0H32V496H480V352Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
