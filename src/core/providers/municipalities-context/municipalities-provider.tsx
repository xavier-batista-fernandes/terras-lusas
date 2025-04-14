import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { fetchMunicipalities } from '../../utilities/fetchMunicipalities.ts';
import { toTitleCase } from '../../utilities/toTitleCase.ts';
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

    const [districts, setDistricts] = useState(new Set<string>());
    const [municipalities, setMunicipalities] = useState(new Set<string>());
    const [municipalitiesPerDistrict, setMunicipalitiesPerDistrict] = useState(new Map<string, Set<string>>());

    const getDistrict = (municipality: string) => {
        const target = details.find((detail) => detail.municipality === toTitleCase(municipality));
        return target?.district;
    };

    const data: MunicipalitiesContextType = {
        isLoading,
        rawData,
        districts,
        municipalities,
        municipalitiesPerDistrict,
        getDistrict,
    };

    useEffect(() => {

        const init = async () => {

            // Fetch the raw data
            const rawData = await fetchMunicipalities();
            setRawData(rawData);

            // Populate array of all municipality details
            const details: Details[] = [];
            rawData.features.forEach((feature: any, index: number) => {
                const district = toTitleCase(feature.properties['District']);
                const municipality = toTitleCase(feature.properties['Municipality']);

                details.push({ id: index, municipality, district });
            });
            setDetails(details);

            // Extract districts from the raw data
            const newMunicipalitiesPerDistrict = new Map<string, Set<string>>();

            rawData.features.forEach(
                (feature: any) => {
                    const district = toTitleCase(feature.properties['District']);
                    const municipality = toTitleCase(feature.properties['Municipality']);

                    // Create a set for the district if it doesn't exist
                    if (!newMunicipalitiesPerDistrict.get(district)) {
                        newMunicipalitiesPerDistrict.set(district, new Set<string>());
                    }

                    // Add municipality to the district set
                    newMunicipalitiesPerDistrict.get(district)!.add(municipality);
                },
            );

            // 1. Create districts set
            setDistricts(new Set((newMunicipalitiesPerDistrict.keys())));

            // 2. Create municipalities set
            setMunicipalities(new Set(Array.from(newMunicipalitiesPerDistrict.values()).flatMap((municipalitySet) => Array.from(municipalitySet))));

            // 3. Save new municipalities per district set
            setMunicipalitiesPerDistrict(new Map(newMunicipalitiesPerDistrict));


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
