import './text-input.css';
import { TextInputProps } from './text-input.props.ts';

export function TextInput({
                              placeholder,
                              autoFocus = true,
                              onChange,
                              onKeyDown,
                              classes,
                          }: TextInputProps) {
    return (
        <input
            className={classes}
            type="text"
            autoFocus={autoFocus}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
}
