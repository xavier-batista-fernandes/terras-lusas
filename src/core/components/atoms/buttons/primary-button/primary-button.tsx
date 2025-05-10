import './primary-button.css';
import { ButtonProps } from '../../../../models/button.props.ts';

export function PrimaryButton({
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
            className="primary-button"
            style={{ fontSize, width, margin }}
        >
            {children}
        </button>
    );
}
