import { stringToSlug } from './string-to-slug.ts';

export function areMunicipalitiesEqual(municipality1: string, municipality2: string) {
    const slug1 = stringToSlug(municipality1);
    const slug2 = stringToSlug(municipality2);
    return slug1 === slug2;
}