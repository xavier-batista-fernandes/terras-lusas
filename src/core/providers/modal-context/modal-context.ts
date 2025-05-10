import { createContext } from 'react';
import { ModalContextType } from './modal-context.type.ts';

export const ModalContext =
    createContext<ModalContextType | undefined>(undefined);