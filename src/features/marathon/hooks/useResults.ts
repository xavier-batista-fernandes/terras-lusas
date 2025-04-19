import { MarathonStatistics } from '../models/marathon-statistics.ts';
import { durationToString } from '../../../core/utils/duration-to-string.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/use-municipalities.ts';
import { getMarathonHistory } from '../utils/get-marathon-history.ts';
import { useEffect } from 'react';

export function useResults(stats: MarathonStatistics) {
    const { details, getDistricts, getDetailsForDistrict } = useMunicipalities();

    useEffect(() => {
        const history = getMarathonHistory();
        if (history.length === 0) {
            throw new Error('No marathon history found.');
        }
    }, []);

    /**
     * Get the duration of the marathon in a human-readable format.
     */
    function getDuration() {
        return durationToString(stats.duration);
    }

    /**
     * Get the number of correct municipalities guessed by the user.
     */
    function getNumberMunicipalitiesGuessed() {
        return `${stats.guesses.length} / ${details.length}`;
    }

    /**
     * Get the number of new municipalities guessed by the user.
     */
    function getNumberMunicipalitiesDiscovered() {
        const history = getMarathonHistory();
        if (history.length === 0) return 0;

        const oldGuesses = history
            .slice(0, -1)
            .flatMap((stats) => stats.guesses.map((guess) => guess.municipality));

        const uniqueGuesses = history
            .slice(-1)[0].guesses
            .filter((guess) => !oldGuesses.includes(guess.municipality));

        return uniqueGuesses.length;
    }

    /**
     * Get the number of districts covered at least once by the guesses.
     */
    function getNumberDistrictsPartiallyCompleted() {
        const districts = new Set<string>();
        stats.guesses.forEach((guess) => {
            const district = details.find((detail) => detail.id === guess.municipality)?.district;
            if (!district) return;
            districts.add(district);
        });
        return districts.size;
    }

    /**
     * Get the number of districts completed by the guesses.
     */
    function getNumberDistrictsFullyCompleted() {
        const districts = getDistricts();
        return districts.reduce((count, district) => {
            const details = getDetailsForDistrict(district);

            const guessedMunicipalities = stats.guesses.map(guess => guess.municipality);
            const missedMunicipalities = details.filter(detail => !guessedMunicipalities.includes(detail.id));

            return missedMunicipalities.length === 0 ? count + 1 : count;
        }, 0);
    }

    /**
     * Get the list of municipalities discovered in the last marathon.
     */
    function getMunicipalitiesDiscovered() {
        const history = getMarathonHistory();
        if (history.length === 0) return [];

        const oldGuesses = history
            .slice(0, -1)
            .flatMap((stats) => stats.guesses.map((guess) => guess.municipality));

        const uniqueGuesses = history
            .slice(-1)[0].guesses
            .filter((guess) => !oldGuesses.includes(guess.municipality));

        return uniqueGuesses.map((guess) => details.find((detail => detail.id === guess.municipality))!);
    }


    return {
        getDuration,
        getNumberMunicipalitiesGuessed,
        getNumberMunicipalitiesDiscovered,
        getNumberDistrictsPartiallyCompleted,
        getNumberDistrictsFullyCompleted,
        getMunicipalitiesDiscovered,
    };
}