import { Details } from '../../models/details.ts';

export type MunicipalitiesContextType = {
    isLoading: boolean;
    rawData?: any; // TODO: abstract raw data from the rest of the app
    details: Details[];
    // districts: Set<string>;
    // municipalities: Set<string>;
    // municipalitiesPerDistrict: Map<string, Set<string>>;
    getDistricts(): string[];
    getDetailsForDistrict(district: string): Details[];
}