import { Feature } from 'ol';
import { Extent, getCenter } from 'ol/extent';

export const getMunicipalityCenter = (feature: Feature) => {
    if (!feature) return;

    const geometry = feature.getGeometry();
    if (!geometry) return;


    const extent: Extent = geometry.getExtent();
    if (!extent) return;

    return getCenter(extent);
};