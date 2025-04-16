import { getMarathonHistory } from '../statistics/get-marathon-history.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/use-municipalities.ts';
import { useEffect, useState } from 'react';

export function useMetrics() {

    const { details, getDistricts, getDetailsForDistrict } = useMunicipalities();

    const [municipalitiesHistogram, setMunicipalitiesHistogram] = useState<[number, number][]>([]);

    useEffect(() => {
        const history = getMarathonHistory();

        // Create a histogram of municipalities
        const unsortedHistogram = new Map();
        history.forEach(stats => {
            stats.guesses.forEach(guess => {
                unsortedHistogram.set(guess.municipality, (unsortedHistogram.get(guess.municipality) || 0) + 1);
            });
        });

        // Convert the map into a sorted array
        const sortedHistogram = Array.from(unsortedHistogram.entries()).sort((a, b) => b[1] - a[1]);

        setMunicipalitiesHistogram(sortedHistogram);
    }, []);

    function getNumberMarathonsPlayed() {
        const history = getMarathonHistory();
        return history.length;
    }

    function getBestScore() {
        const history = getMarathonHistory();
        return Math.max(...history.map(stats => stats.guesses.length));
    }

    function getAverageScore() {
        const history = getMarathonHistory();
        return history.reduce((acc, stats) => acc + stats.guesses.length, 0) / history.length;
    }

    function getNumberUnknownMunicipalities() {
        const history = getMarathonHistory();
        const knownMunicipalities = new Set<number>();
        history.forEach(stats => {
            stats.guesses.forEach(guess => knownMunicipalities.add(guess.municipality));
        });
        return details.length - knownMunicipalities.size;
    }

    function getNumberUnknownMunicipalitiesPerDistrict(district: string) {
        const history = getMarathonHistory();
        const details = getDetailsForDistrict(district);
        const knownMunicipalities = new Set<number>(details.map(detail => detail.id));
        history.forEach(stats => {
            stats.guesses.forEach(guess => knownMunicipalities.delete(guess.municipality));
        });
        return knownMunicipalities.size;
    }

    function getNumberCompleteDistricts() {
        const districts = getDistricts();
        return districts.reduce(
            (total, district) =>
                getNumberUnknownMunicipalitiesPerDistrict(district) === 0
                    ? total + 1
                    : total,
            0);
    }

    function getMunicipalityParticipation(id: number) {
        // TODO: save histogram as pairs of {id, count}
        const history = getMarathonHistory();
        const target = municipalitiesHistogram.find(municipality => municipality[0] === id);
        return target ? (target[1] / history.length) * 100 : undefined;
    }

    // BEST MUNICIPALITY
    function getBestMunicipality() {
        if (municipalitiesHistogram.length === 0) return undefined;
        const id = municipalitiesHistogram[0][0];
        return details.find(detail => detail.id === id)?.municipality;
    }

    function getBestMunicipalityParticipation() {
        if (municipalitiesHistogram.length === 0) return undefined;
        const id = municipalitiesHistogram[0][0];
        return getMunicipalityParticipation(id);
    }

    return {
        getNumberMarathonsPlayed,
        getBestScore,
        getAverageScore,
        getNumberUnknownMunicipalities,
        getNumberUnknownMunicipalitiesPerDistrict,
        getNumberCompleteDistricts,
        getBestMunicipality,
        getBestMunicipalityParticipation,
    };
}