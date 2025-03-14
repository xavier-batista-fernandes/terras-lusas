import './daily.css';
import { Container } from '../../atoms/container/container.tsx';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { useEffect, useState } from 'react';
import { Text } from '../../atoms/text/text.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { getMunicipalitiesLayer } from '../../../utilities/getMunicipalitiesLayer.ts';

export const Daily = () => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {


        const municipalitiesLayer = getMunicipalitiesLayer();
        municipalitiesLayer.setStyle((feature) => {
            const yesStyle = new Style({
                fill: new Fill({ color: 'green' }),
                stroke: new Stroke({ color: 'black', width: 3 }),
                zIndex: 10
            });
            const noStyle = new Style({
                fill: new Fill({ color: 'gray' }), stroke: new Stroke({ color: 'black', width: 1 }),
                zIndex: 5
            });

            return feature.getProperties()['Municipality'] === 'LEIRIA' ? yesStyle : noStyle;
        });

        municipalitiesLayer.getSource()?.on('change', () => {
            console.log('Source changed');
            console.log(municipalitiesLayer.getSource()?.getFeatures());
        });
        // const targetMunicipality = getRandomFeature(municipalitiesLayer);
        // console.log('target:', targetMunicipality);

        // console.log('Feature:', feature);
        // console.log('Geometry:', feature.getGeometry());
        // console.log('Municipality', feature.getProperties()['Municipality']);
        // console.log('Center', getMunicipalityCenter(feature));
        //
        const map = new Map();

        map.setTarget('map');
        map.setView(new View({
            center: fromLonLat([-8.55, 38.65]),
            zoom: 10.75
        }));
        map.addLayer(municipalitiesLayer);

        setIsLoading(false);

        return () => {
            console.log('Cleaning up...');
        };
    }, []);

    return <>
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
            <div style={{ display: isLoading ? 'none' : 'inherit' }} id="map"></div>
        </Container>
    </>;
};
