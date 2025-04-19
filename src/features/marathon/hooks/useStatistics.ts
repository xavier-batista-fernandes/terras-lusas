import { getMarathonHistory } from '../utils/get-marathon-history.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/use-municipalities.ts';
import { useEffect, useState } from 'react';
import { durationToSeconds } from '../../../core/utils/duration-to-seconds.ts';
import { secondsToDuration } from '../../../core/utils/seconds-to-duration.ts';

export function useStatistics() {

    const history = getMarathonHistory();
    const { details, getDistricts, getDetailsForDistrict } = useMunicipalities();

    const [histogram, setHistogram] = useState<{ id: number, count: number }[]>([]);


    useEffect(() => {
        // Create a histogram of municipalities
        const unsorted = new Map<number, number>();
        history.forEach(stats => {
            stats.guesses.forEach(guess => {
                unsorted.set(guess.municipality, (unsorted.get(guess.municipality) || 0) + 1);
            });
        });

        // Convert the map into a sorted array
        const sorted = Array.from(unsorted.entries()).sort((a, b) => b[1] - a[1]);
        const histogram = sorted.map(([id, count]) => {
            return {
                id, count,
            };
        });

        setHistogram(histogram);
    }, []);

    function getNumberMarathonsPlayed() {
        return history.length;
    }

    function getBestScore() {
        return Math.max(...history.map(stats => stats.guesses.length));
    }

    function getNumberUnknownMunicipalities() {
        const knownMunicipalities = new Set<number>();
        history.forEach(stats => {
            stats.guesses.forEach(guess => knownMunicipalities.add(guess.municipality));
        });
        return details.length - knownMunicipalities.size;
    }

    function getNumberUnknownMunicipalitiesPerDistrict(district: string) {
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

    function getQuitsPercentage() {
        return history.reduce((acc, stats) => acc + (stats.didQuit ? 1 : 0), 0) / history.length * 100;
    }

    function getMunicipalityPercentage(id: number) {
        const target = histogram.find(municipality => municipality.id === id);
        return target ? (target.count / history.length) * 100 : undefined;
    }

    function getBestMunicipality() {
        if (histogram.length === 0) return undefined;
        return details.find(detail => detail.id === histogram[0].id)?.municipality;
    }

    function getBestMunicipalityPercentage() {
        if (histogram.length === 0) return undefined;
        return getMunicipalityPercentage(histogram[0].id);
    }

    function getAverageScore() {
        return history.reduce((acc, stats) => acc + stats.guesses.length, 0) / history.length;
    }

    function getAverageDuration() {
        const totalSeconds = history.reduce((acc, stats) => acc + durationToSeconds(stats.duration), 0);
        const averageSeconds = totalSeconds / history.length;
        return secondsToDuration(averageSeconds);
    }

    return {
        getNumberMarathonsPlayed,
        getNumberUnknownMunicipalities,
        getNumberUnknownMunicipalitiesPerDistrict,
        getNumberCompleteDistricts,
        getAverageScore,
        getAverageDuration,
        getBestScore,
        getBestMunicipality,
        getBestMunicipalityPercentage,
        getQuitsPercentage,
    };
}