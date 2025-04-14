import { getMarathonHistory } from '../statistics/get-marathon-history.ts';
import { useMunicipalities } from '../../../core/providers/municipalities-context/use-municipalities.ts';

export function useMetrics() {

    const { details, getDistricts, getDetailsForDistrict } = useMunicipalities();

    function getNumberMarathonsPlayed() {
        const history = getMarathonHistory();
        return history.length;
    }

    function getBestScore() {
        const history = getMarathonHistory();
        return Math.max(...history.map(stats => stats.municipalities.length));
    }

    function getAverageScore() {
        const history = getMarathonHistory();
        return (history.reduce((acc, stats) => acc + stats.municipalities.length, 0) / history.length).toFixed(2);
    }

    function getNumberUnknownMunicipalities() {
        const history = getMarathonHistory();
        const knownMunicipalities = new Set<number>();
        history.forEach(stats => {
            stats.municipalities.forEach(municipality => knownMunicipalities.add(municipality));
        });
        return details.length - knownMunicipalities.size;
    }

    function getNumberUnknownMunicipalitiesPerDistrict(district: string) {
        const history = getMarathonHistory();
        const details = getDetailsForDistrict(district);
        const knownMunicipalities = new Set<number>(details.map(detail => detail.id));
        history.forEach(stats => {
            stats.municipalities.forEach(id => knownMunicipalities.delete(id));
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

    return {
        getNumberMarathonsPlayed,
        getBestScore,
        getAverageScore,
        getNumberUnknownMunicipalities,
        getNumberUnknownMunicipalitiesPerDistrict,
        getNumberCompleteDistricts,
    };
}