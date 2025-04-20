import { createContext, ReactNode, useEffect, useState } from 'react';
import { fetchMunicipalities } from '../../utils/fetchMunicipalities.ts';
import { stringToTitleCase } from '../../utils/string-to-title-case.ts';
import { Details } from '../../models/details.ts';
import { MunicipalitiesContextType } from './municipalities-context-type.ts';

export const MunicipalitiesContext = createContext<MunicipalitiesContextType | undefined>(undefined);

export function MunicipalitiesProvider({ children }: { children: ReactNode }) {

    const [isLoading, setIsLoading] = useState(true);
    const [rawData, setRawData] = useState<{ type: string, features: any } | undefined>(undefined);
    const [details, setDetails] = useState<Details[]>([]);

    const context: MunicipalitiesContextType = {
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
        <MunicipalitiesContext.Provider value={context}>
            {children}
        </MunicipalitiesContext.Provider>
    );
}