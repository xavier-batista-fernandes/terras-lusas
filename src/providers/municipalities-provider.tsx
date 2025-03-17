import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMunicipalities } from '../utilities/fetchMunicipalities.ts';

const MunicipalitiesContext = createContext<MunicipalitiesContextData | undefined>(undefined);

export interface MunicipalitiesContextData {
    geojson?: any;
    isLoading: boolean;
}

export const useMunicipalities = () => {
    const context = useContext(MunicipalitiesContext);
    if (!context) throw new Error('useMunicipalities must be used within a MunicipalitiesProvider');
    return context;
};

export const MunicipalitiesProvider = ({ children }: { children: ReactNode }) => {

    const [geojson, setGeojson] = useState<any>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const data: MunicipalitiesContextData = {
        geojson,
        isLoading
    };

    useEffect(() => {

        const init = async () => {
            setGeojson(await fetchMunicipalities());
            setIsLoading(false);
        };

        init();

        return () => {
            // TODO: learn how to clean up providers
        };
    }, []);

    return (
        <MunicipalitiesContext.Provider value={data}>
            {children}
        </MunicipalitiesContext.Provider>
    );
};
