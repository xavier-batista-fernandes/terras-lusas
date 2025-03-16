import './daily.css';
import { Container } from '../../atoms/container/container.tsx';
import { Map, View } from 'ol';
import { useEffect, useRef, useState } from 'react';
import { Text } from '../../atoms/text/text.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { getRandomFeature } from '../../../utilities/getRandomFeature.ts';
import { getMunicipalityCenter } from '../../../utilities/getMunicipalityCenter.ts';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import { useGeographic } from 'ol/proj';

// Map projections:
// 1. Web Mercator (EPSG:3857) (Meters) – The Default
// 2. Geographic Coordinates (EPSG:4326) (Degrees, longitude and latitude)

export const Daily = () => {

    useGeographic();
    const [isLoading, setIsLoading] = useState(true);
    const mapElement = useRef(null);

    useEffect(() => {

        if (!mapElement.current) throw new Error('Map element not found.');

        const mapInstance = new Map();

        const init = async () => {

            if (!mapElement.current) throw new Error('Map element not found.');

            // Read geojson file
            const geojson = await fetch('assets/data/municipalities-heavy.geojson');
            const geojsonObject = await geojson.json();
            console.log('geojson:', geojson);
            console.log('geojsonObject:', geojsonObject);

            // Create a vector source
            const vectorSource = new VectorSource({
                features: new GeoJSON().readFeatures(geojsonObject)
            });

            // Create vector layer
            const vectorLayer = new VectorLayer({ source: vectorSource });

            // Get random feature
            const targetFeature = getRandomFeature(vectorLayer);

            // Update style of features
            vectorLayer.setStyle((feature) => {
                const yesStyle = new Style({
                    fill: new Fill({ color: '#84c844' }),
                    stroke: new Stroke({ color: 'black', width: 2 }),
                    zIndex: 10
                });
                const noStyle = new Style({
                    fill: new Fill({ color: '#c5c5c5' }),
                    stroke: new Stroke({ color: 'gray', width: 1 }),
                    zIndex: 5
                });

                return feature === targetFeature ? yesStyle : noStyle;
            });

            // Get center of the feature
            const centerFeature = getMunicipalityCenter(targetFeature);

            // Create view
            const view = new View({
                center: centerFeature,
                zoom: 10
            });

            mapInstance.setTarget(mapElement.current);
            mapInstance.setLayers([vectorLayer]);
            mapInstance.setView(view);

            setIsLoading(false);
        };

        init().then(() => console.log('Setup complete.'));

        return () => {
            console.log('Cleaning up...');

            mapInstance.setTarget(undefined);
            mapInstance.dispose();
        };
    }, []);

    return (
        <Container
            height={'100vh'}
            width={'100vw'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            overflow={'hidden'}
        >
            <Text display={isLoading ? 'inherit' : 'none'} fontSize={'3rem'} fontWeight={'bolder'}>Loading...</Text>
            <div style={{ display: isLoading ? 'none' : 'inherit' }} id="map" ref={mapElement}></div>
        </Container>
    );
};
