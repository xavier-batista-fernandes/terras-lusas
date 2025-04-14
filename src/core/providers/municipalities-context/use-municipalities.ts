import { useContext } from 'react';
import { MunicipalitiesContext } from './municipalities-provider.tsx';

export const useMunicipalities = () => {
    const context = useContext(MunicipalitiesContext);
    if (!context) throw new Error('useMunicipalities must be used within a MunicipalitiesProvider');
    return context;
};
