import './underlined-text-input.css';
import { TextInput } from '../../../atoms/inputs/text-input.tsx';
import { UnderlinedTextInputProps } from './underlined-text-input.props';

export function UnderlinedTextInput({ onChange, onKeyDown }: UnderlinedTextInputProps) {

    return (
        <TextInput
            autoFocus={true}
            onChange={onChange}
            onKeyDown={onKeyDown}
            classes="underlined-text-input"
        />
    );
}