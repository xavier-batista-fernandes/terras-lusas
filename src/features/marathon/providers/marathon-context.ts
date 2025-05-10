import { createContext } from 'react';
import { MarathonContextType } from './marathon-context.type.ts';

export const MarathonContext = createContext<MarathonContextType | undefined>(undefined);