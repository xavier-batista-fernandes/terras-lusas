import './underlined-text-input.css';
import { TextInput } from '../../../../../core/components/atoms/inputs/text-input.tsx';
import { UnderlinedTextInputProps } from './underlined-text-input.props.ts';

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