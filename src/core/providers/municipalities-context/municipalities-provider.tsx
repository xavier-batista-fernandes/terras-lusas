import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMunicipalities } from '../../utilities/fetchMunicipalities.ts';
import { stringToTitleCase } from '../../utilities/string-to-title-case.ts';
import { Details } from '../../models/details.ts';
import { MunicipalitiesContextType } from './municipalities-context-type.ts';

const MunicipalitiesContext = createContext<MunicipalitiesContextType | undefined>(undefined);

export const useMunicipalities = () => {
    const context = useContext(MunicipalitiesContext);
    if (!context) throw new Error('useMunicipalities must be used within a MunicipalitiesProvider');
    return context;
};

export const MunicipalitiesProvider = ({ children }: { children: ReactNode }) => {

    const [details, setDetails] = useState<Details[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [rawData, setRawData] = useState<{ type: string, features: any } | undefined>(undefined);


    const data: MunicipalitiesContextType = {
        isLoading,
        rawData,
        details,
        getDistricts,
        getDetailsForDistrict,
    };

    useEffect(() => {
        const init = async () => {

            // Fetch the raw data
            const rawData = await fetchMunicipalities();
            setRawData(rawData);

            // Populate array of all municipality details
            const details: Details[] = [];
            rawData.features.forEach((feature: any, index: number) => {
                const district = stringToTitleCase(feature.properties['District']);
                const municipality = stringToTitleCase(feature.properties['Municipality']);

                details.push({ id: index, municipality, district });
            });
            setDetails(details);
            setIsLoading(false);
            // TODO: handle errors and allow for page reloads
        };

        init();

        return () => {
            // TODO: learn how to clean up providers
        };
    }, []);

    function getDistricts() {
        const districts = new Set<string>();
        details.forEach((detail) => districts.add(detail.district));
        return Array.from(districts);
    }

    function getDetailsForDistrict(district: string) {
        return details.filter(detail => detail.district === district);
    }

    return (
        <MunicipalitiesContext.Provider value={data}>
            {children}
        </MunicipalitiesContext.Provider>
    );
};
