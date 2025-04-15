import './underlined-text-input.css';
import { UnderlinedTextInputProps } from './underlined-text-input.props.ts';

export function UnderlinedTextInput({ onChange, onKeyDown }: UnderlinedTextInputProps) {
    return <input
        className={'underlined-text-input'}
        autoFocus={true}
        onChange={onChange}
        onKeyDown={onKeyDown}
    />;

}