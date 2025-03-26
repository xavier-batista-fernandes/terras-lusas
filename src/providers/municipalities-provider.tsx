import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMunicipalities } from '../utilities/fetchMunicipalities.ts';
import { toTitleCase } from '../utilities/toTitleCase.ts';

const MunicipalitiesContext = createContext<MunicipalitiesContextData | undefined>(undefined);

export interface MunicipalitiesContextData {
    rawData?: any;
    districts: Set<string>;
    isLoading: boolean;
}

export const useMunicipalities = () => {
    const context = useContext(MunicipalitiesContext);
    if (!context) throw new Error('useMunicipalities must be used within a MunicipalitiesProvider');
    return context;
};

export const MunicipalitiesProvider = ({ children }: { children: ReactNode }) => {

    const [rawData, setRawData] = useState<{ type: string, features: any } | undefined>(undefined);
    const [districts, setDistricts] = useState(new Set<string>());
    const [isLoading, setIsLoading] = useState(true);

    const data: MunicipalitiesContextData = {
        rawData,
        districts,
        isLoading,
    };

    useEffect(() => {

        const init = async () => {

            // Fetch the raw data
            const rawData = await fetchMunicipalities();
            setRawData(rawData);

            // Extract districts from the raw data
            const districts = new Set<string>(rawData.features.map((municipality: any) =>
                toTitleCase(municipality.properties['District'])));
            console.log('districts', districts);
            setDistricts(districts);

            // Loading is complete
            setIsLoading(false);
            // TODO: handle errors and allow for page reloads
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
