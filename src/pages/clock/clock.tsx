import './clock.css';
import { Container } from '../../components/atoms/container/container.tsx';
import { Feature, Map, View } from 'ol';
import { useEffect, useRef } from 'react';
import { Text } from '../../components/atoms/text/text.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { useGeographic } from 'ol/proj';
import { useMunicipalities } from '../../providers/municipalities-provider.tsx';
import { GeoJSON } from 'ol/format';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { getMunicipalityCenter } from '../../utilities/getMunicipalityCenter.ts';

export const Clock = () => {

    useGeographic();
    const mapElement = useRef(null);
    const municipalitiesContext = useMunicipalities();

    const unselectedStyle = new Style({
        stroke: new Stroke({
            color: 'black',
            width: 1
        }),
        fill: new Fill({
            color: 'rgba(211,211,211,0.66)'
        }),
        zIndex: 5
    });

    let mapInstance: Map;
    useEffect(() => {

        if (municipalitiesContext.isLoading) return;

        mapInstance = new Map();
        if (!mapElement.current) throw new Error('Map element not found.');

        const geojson = municipalitiesContext.geojson;
        console.log('geojosn', geojson);
        const features = new GeoJSON().readFeatures(geojson);
        const source = new VectorSource({ features });
        const vectorLayer = new VectorLayer({ source });


        // Update style of features
        vectorLayer.setStyle(() => {
            return unselectedStyle;
        });

        // Create view
        const view = new View({
            center: [-8, 39.5],
            zoom: 7.25
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

    function evaluateAnswer(input: string) {

        const greenColors = ['#386641', '#6a994e', '#a7c957'];
        // TODO: create a map context (sort of a component store).
        const features: Feature[] = mapInstance.getLayers().getArray()[0].getSource().getFeatures();


        for (const feature of features) {
            if (feature.getProperties().Municipality === input.toUpperCase()) {
                feature.setStyle(new Style({
                    fill: new Fill({ color: greenColors[Math.floor(Math.random() * greenColors.length)] }),
                    stroke: new Stroke({ width: 2 }),
                    zIndex: 10
                }));
                const center = getMunicipalityCenter(feature);
                mapInstance.setView(new View({ center, zoom: 10 }));

                console.log('CORRECT!!!', feature);

                return;
            }
        }
        console.log('WRONG!!!');
    }

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
                    <input type="text" onKeyDown={(event: any) => {

                        if (event.key === 'Enter') {
                            evaluateAnswer(event.target.value);
                            console.log('key pressed', event, event.target.value);
                        }
                    }} />
                    {/* TODO: add dropdown or text input */}
                </Container>
            </Container>;
        </>
    );
};
