import React, { ChangeEvent } from 'react';

export interface UnderlinedTextInputProps {
    onChange?: (event: ChangeEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}