import { IconProps } from './icon.props.ts';

export function IconOne({ fill = 'none', stroke = 'white', strokeWidth = 10 }: IconProps) {
    return (
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M464,48c-67.61.29-117.87,9.6-154.24,25.69C282.62,85.69,272,94.77,272,125.53V448c41.57-37.5,78.46-48,224-48V48Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <path
                d="M48,48c67.61.29,117.87,9.6,154.24,25.69,27.14,12,37.76,21.08,37.76,51.84V448c-41.57-37.5-78.46-48-224-48V48Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
}
