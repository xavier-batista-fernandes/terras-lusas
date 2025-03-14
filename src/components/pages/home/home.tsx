import './home.css';
import { Container } from '../../atoms/container/container.tsx';
import { useEffect } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Select } from 'ol/interaction';
import { always, pointerMove } from 'ol/events/condition';
import { Text } from '../../atoms/text/text.tsx';
import { HomeButton } from '../../atoms/buttons/home-button/home-button.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { useNavigate } from 'react-router-dom';
import { getMunicipalitiesLayer } from '../../../utilities/getMunicipalitiesLayer.ts';

export const Home = () => {
    const navigate = useNavigate();
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

    const view = new View({
        center: fromLonLat([-8.55, 38.65]),
        resolution: 0,
        maxResolution: 300,
        minResolution: 300

    });

    const municipalitiesLayer = getMunicipalitiesLayer();
    municipalitiesLayer.setStyle(unselectedStyle);

    useEffect(() => {

        const map = new Map();
        map.setTarget('map');
        map.setView(view);
        map.addLayer(municipalitiesLayer);


        const selectInteraction = new Select({
            condition: pointerMove,
            addCondition: always
        });
        map.addInteraction(selectInteraction);

        selectInteraction.getFeatures().on('add', (event) => {
            const colors = ['#386641', '#6a994e', '#a7c957', '#f2e8cf', '#fb8b24'];
            const selectedStyle = new Style({
                stroke: new Stroke({
                    color: 'black',
                    width: 1
                }),
                fill: new Fill({
                    color: colors[Math.floor(Math.random() * colors.length)]
                }),
                zIndex: 10
            });
            event.element.setStyle(selectedStyle);

            console.log('geometry', event.element.getGeometry()?.getExtent());
            // view.animate({ rotation: 290, duration: 500, easing: easeIn });
        });

    }, []);

    return <>
        <Container
            height={'100vh'}
            width={'100vw'}
            display={'flex'}
            overflow={'hidden'}
        >
            <Container
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                height={'100vh'}
                width={'30%'}
            >
                <Text fontSize={'3rem'} margin={'10px 0'}>Terras Lusas</Text>
                <Text fontWeight={'lighter'} margin={'10px 0'}>Sabes onde é a tal terrinha do teu amigo António?</Text>
                <HomeButton margin={'20px'} onClick={() => navigate('/daily')}>Jogar</HomeButton>
            </Container>
            <Container
                height={'100vh'}
                width={'70%'}

            >
                <div id="map"></div>
            </Container>
        </Container>
    </>;
};

// const getCentroid = (feature: Feature) => {
//     if (feature === undefined) return;
//     if (feature.getGeometry() === undefined) return;
//
//     const [] = feature.getGeometry()?.getExtent();
// };