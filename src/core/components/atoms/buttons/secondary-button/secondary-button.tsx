import './secondary-button.css';
import { ButtonProps } from '../../../../models/button.props.ts';

export function SecondaryButton({
                                    children,
                                    isDisabled = false,
                                    onClick,
                                    fontSize = '0.85rem',
                                    width,
                                    margin,
                                }: ButtonProps) {
    return (
        <button
            disabled={isDisabled}
            onClick={onClick}
            className="secondary-button"
            style={{ fontSize, width, margin }}
        >
            {children}
        </button>
    );
}
