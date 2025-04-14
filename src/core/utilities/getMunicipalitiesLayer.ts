import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';

export const getMunicipalitiesLayer = () => {
    const URL = 'assets/data/portugal.geojson';

    const vectorSource = new VectorSource({
        url: URL,
        format: new GeoJSON()
    });

    return new VectorLayer({
        source: vectorSource
    });
};