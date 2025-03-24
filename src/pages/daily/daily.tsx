import './daily.css';
import { Container } from '../../components/atoms/container/container.tsx';
import { Map, View } from 'ol';
import { useEffect, useRef } from 'react';
import { Text } from '../../components/atoms/text/text.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { getRandomFeature } from '../../utilities/getRandomFeature.ts';
import { getMunicipalityCenter } from '../../utilities/getMunicipalityCenter.ts';
import { useGeographic } from 'ol/proj';
import { MunicipalitiesInput } from '../../components/molecules/inputs/municipalities-input/municipalities-input.tsx';
import { useMunicipalities } from '../../providers/municipalities-provider.tsx';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

// Map projections:
// 1. Web Mercator (EPSG:3857) (Meters) – The Default
// 2. Geographic Coordinates (EPSG:4326) (Degrees, longitude and latitude)

export const Daily = () => {

    useGeographic();
    const mapElement = useRef(null);
    const municipalitiesContext = useMunicipalities();

    useEffect(() => {

        if (municipalitiesContext.isLoading) return;
        if (!mapElement.current) throw new Error('Map element not found.');

        const mapInstance = new Map();

        if (!mapElement.current) throw new Error('Map element not found.');

        const geojson = municipalitiesContext.geojson;
        console.log('geojosn', geojson);
        const features = new GeoJSON().readFeatures(geojson);
        const source = new VectorSource({ features });
        const vectorLayer = new VectorLayer({ source });

        // Get random feature
        const targetFeature = getRandomFeature(vectorLayer);

        // Update style of features
        vectorLayer.setStyle((feature) => {
            const yesStyle = new Style({
                fill: new Fill({ color: 'rgba(122,122,122,0.7)' }),
                stroke: new Stroke({ color: 'black', width: 2 }),
                zIndex: 10,
            });
            const noStyle = new Style({
                fill: new Fill({ color: '#c5c5c5' }),
                stroke: new Stroke({ color: 'gray', width: 1 }),
                zIndex: 5,
            });

            return feature === targetFeature ? yesStyle : noStyle;
        });

        // Get center of the feature
        const centerFeature = getMunicipalityCenter(targetFeature);

        // Create view
        const view = new View({
            center: centerFeature,
            zoom: 10,
        });

        mapInstance.setTarget(mapElement.current);
        mapInstance.setLayers([vectorLayer]);
        mapInstance.setView(view);

        return () => {
            console.log('Cleaning up...');

            mapInstance.setTarget(undefined);
            mapInstance.dispose();
        };
    });

    return (
        <>
            {/* Loading component... */}
            <Container
                height={'100vh'}
                width={'100vw'}
                display={municipalitiesContext.isLoading ? 'flex' : 'none'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                overflow={'hidden'}
            >
                <Text fontSize={'3rem'} fontWeight={'bolder'}>Loading...</Text>
            </Container>

            {/* Content... */}
            <Container
                height={'100vh'}
                width={'100vw'}
                display={municipalitiesContext.isLoading ? 'none' : 'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                overflow={'hidden'}
            >
                <Container width={'50%'}>
                    <div id="map" ref={mapElement}></div>
                </Container>
                <Container width={'50%'}
                           display={'flex'}
                           flexDirection={'column'}
                           justifyContent={'center'}
                           alignItems={'center'}
                           gap={'20px'}
                >
                    <Text fontSize={'2rem'} fontWeight={'bolder'}>Que terrinha é esta?</Text>
                    <MunicipalitiesInput />
                    {/* TODO: add dropdown or text input */}
                </Container>
            </Container>;
        </>
    );
};
