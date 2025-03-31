import { useEffect, useRef } from 'react';
import { useGeographic } from 'ol/proj';
import { Feature, Map, View } from 'ol';
import { useMunicipalities } from '../providers/municipalities-provider.tsx';
import { GeoJSON } from 'ol/format';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { getRandomColor } from '../utilities/getRandomColor.ts';
import { getMunicipalityCenter } from '../utilities/getMunicipalityCenter.ts';

export function useMap() {

    useGeographic();

    const mapElement = useRef(null); // TODO: receive as input of hook instead?
    const mapInstance = useRef<Map>(null);
    const mapFeatures = useRef<Feature[]>(null);

    // Get municipalities context
    const { isLoading, rawData } = useMunicipalities();

    const DEFAULT_STYLE = new Style({
        stroke: new Stroke({
            color: 'black',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(211,211,211,0.66)',
        }),
        zIndex: 5,
    });

    const DEFAULT_VIEW = new View({
        center: [-8, 39.5],
        zoom: 7.25,
    });

    const paintMunicipality = (municipality: string) => {
        const features: Feature[] = mapFeatures.current ?? [];

        const guessedMunicipality = features.find(
            (feature) => feature.getProperties()['Municipality'] === municipality.toUpperCase());
        if (!guessedMunicipality) return;

        guessedMunicipality.setStyle(
            new Style({
                fill: new Fill({ color: getRandomColor() }),
                stroke: new Stroke({ width: 1 }),
                zIndex: 10,
            }),
        );

        // TODO: move mapInstance.current?.getView() to a variable
        mapInstance.current?.getView()?.setCenter(getMunicipalityCenter(guessedMunicipality));
        mapInstance.current?.getView()?.setZoom(9);
    };

    useEffect(() => {
        if (!mapElement.current) throw new Error('Could not retrieve map reference from the component\'s view.');
    }, []);

    useEffect(() => {
        console.log('Mounting map...');
        if (isLoading) return;
        if (mapInstance.current) return;
        if (!mapElement.current) return;

        mapInstance.current = new Map();

        const features = new GeoJSON().readFeatures(rawData);
        const source = new VectorSource({ features });
        const layer = new VectorLayer({ source });
        layer.setStyle(() => DEFAULT_STYLE);

        mapInstance.current.setTarget(mapElement.current);
        mapInstance.current.setLayers([layer]);
        mapInstance.current.setView(DEFAULT_VIEW);

        mapFeatures.current = features;

        return () => {
            console.log('Dismounting map...');
            if (!mapInstance.current) return;
            mapInstance.current.setTarget(undefined);
            mapInstance.current.dispose();
        };
    }, [isLoading]);

    return {
        isLoading,
        mapElement,
        mapInstance: mapInstance.current,
        mapFeatures: mapFeatures.current,
        mapView: mapInstance.current?.getView(),
        paintMunicipality,
    };
}