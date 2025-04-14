import React, { ChangeEvent } from 'react';

export interface TextInputProps {
    placeholder?: string;
    autoFocus?: boolean;

    onChange?: (event: ChangeEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;

    classes?: string;
}