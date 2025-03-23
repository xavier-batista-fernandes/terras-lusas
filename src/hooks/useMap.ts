import { useEffect, useRef } from 'react';
import { useGeographic } from 'ol/proj';
import { Map, View } from 'ol';
import { useMunicipalities } from '../providers/municipalities-provider.tsx';
import { GeoJSON } from 'ol/format';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Fill, Stroke, Style } from 'ol/style';

export function useMap() {

    useGeographic();

    const mapElement = useRef(null);
    const mapInstance = useRef<Map>(null);

    // Get municipalities context
    const { isLoading, geojson } = useMunicipalities();

    const DEFAULT_STYLE = new Style({
        stroke: new Stroke({
            color: 'black',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(211,211,211,0.66)'
        }),
        zIndex: 5
    });

    const DEFAULT_VIEW = new View({
        center: [-8, 39.5],
        zoom: 7.25
    });

    useEffect(() => {

        if (isLoading) return;
        if (mapInstance.current) return;

        mapInstance.current = new Map();
        if (!mapElement.current) throw new Error('Map element not found.');

        const features = new GeoJSON().readFeatures(geojson);
        const source = new VectorSource({ features });
        const vectorLayer = new VectorLayer({ source });

        // Update style of features
        vectorLayer.setStyle(() => DEFAULT_STYLE);

        mapInstance.current.setTarget(mapElement.current);
        mapInstance.current.setLayers([vectorLayer]);
        mapInstance.current.setView(DEFAULT_VIEW);

        return () => {
            console.log('Cleaning up...');
            if (!mapInstance.current) return;
            mapInstance.current.setTarget(undefined);
            mapInstance.current.dispose();
        };
    }, [isLoading]);

    return {
        mapElement,
        mapInstance
    };
}