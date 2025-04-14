export type MunicipalitiesContextType = {
    isLoading: boolean;
    rawData?: any; // TODO: abstract raw data from the rest of the app
    districts: Set<string>;
    municipalities: Set<string>;
    municipalitiesPerDistrict: Map<string, Set<string>>;
    getDistrict(municipality: string): string | undefined;
    // getMunicipalities(district: string): Set<string> | undefined; // TODO: implement me
}