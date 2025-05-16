import { ReactNode, useEffect, useState } from 'react';
import { stringToTitleCase } from '../../utils/string-to-title-case.ts';
import { Details } from '../../models/details.ts';
import { MunicipalitiesContextType } from './municipalities-context.type.ts';
import { MunicipalitiesContext } from './municipalities-context.ts';
import { areMunicipalitiesEqual } from '../../utils/are-municipalities-equal.ts';

export function MunicipalitiesProvider({ children }: { children: ReactNode }) {

    const [isLoading, setIsLoading] = useState(true);
    const [details, setDetails] = useState<Details[]>([]);

    const context: MunicipalitiesContextType = {
        isLoading,
        details,
        getDistricts,
        getDetailsForDistrict,
        getMunicipalityId,
        getMatchingMunicipalityIds,
    };

    useEffect(() => {
        const init = async () => {
            // Fetch the raw data
            // TODO: see how to handle errors when awaiting instead of using then or catch
            const URL = '/assets/data/municipalities.json';
            const response = await fetch(URL);
            const rawData = await response.json();

            // Populate an array with all the municipality details
            const details: Details[] = [];
            rawData.objects.municipalities.geometries.forEach((geometry: any, index: number) => {
                const district = stringToTitleCase(geometry.properties['NAME_1']);
                const municipality = stringToTitleCase(geometry.properties['NAME_2']);

                details.push({ id: index, municipality, district });
            });
            setDetails(details);
            setIsLoading(false);
        };

        init().then();

        // TODO: learn how to clean up providers
        return () => {
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

    function getMunicipalityId(municipality: string) {
        const target = details.find((detail) => areMunicipalitiesEqual(detail.municipality, municipality));
        return target?.id;
    }

    function getMatchingMunicipalityIds(substring: string) {
        if (substring.length === 0) return [];
        const matchingDetails = details.filter((detail) => detail.municipality.toLowerCase().startsWith(substring.toLowerCase()));
        return matchingDetails.map((detail) => detail.id);
    }

    return (
        <MunicipalitiesContext.Provider value={context}>
            {children}
        </MunicipalitiesContext.Provider>
    );
}