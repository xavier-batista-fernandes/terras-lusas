import { Details } from '../../models/details.ts';

export type MunicipalitiesContextType = {
    isLoading: boolean;
    details: Details[];
    getDistricts(): string[];
    getDetailsForDistrict(district: string): Details[];
    getMunicipalityId(municipality: string): number | undefined;
    getMatchingMunicipalityIds(input: string): number[];
}