import { ReactNode, useEffect, useState } from 'react';
import { stringToTitleCase } from '../../utils/string-to-title-case.ts';
import { Details } from '../../models/details.ts';
import { MunicipalitiesContextType } from './municipalities-context.type.ts';
import { MunicipalitiesContext } from './municipalities-context.ts';

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
            const URL = '/assets/data/municipalities.json';
            const response = await fetch(URL);
            // TODO: see how to handle errors when awaiting instead of using then or catch
            const rawData = await response.json();
            setRawData(rawData);

            // Populate array of all municipality details
            const details: Details[] = [];
            rawData.objects.municipalities.geometries.forEach((geometry: any, index: number) => {
                const district = stringToTitleCase(geometry.properties['NAME_1']);
                const municipality = stringToTitleCase(geometry.properties['NAME_2']);

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