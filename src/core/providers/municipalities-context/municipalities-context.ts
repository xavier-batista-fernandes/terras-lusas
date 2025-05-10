import { createContext } from 'react';
import { MunicipalitiesContextType } from './municipalities-context.type.ts';

export const MunicipalitiesContext =
    createContext<MunicipalitiesContextType | undefined>(undefined);