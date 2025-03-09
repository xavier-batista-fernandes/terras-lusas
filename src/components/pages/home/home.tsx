import './home.css';
import { Container } from '../../atoms/container/container.tsx';
import { useEffect } from 'react';
import { Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { fromLonLat } from 'ol/proj';
import { MapOptions } from 'ol/Map';
import { Select } from 'ol/interaction';
import { always, pointerMove } from 'ol/events/condition';
import { Text } from '../../atoms/text/text.tsx';
import { HomeButton } from '../../atoms/buttons/home-button/home-button.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { useNavigate } from 'react-router-dom';

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

    const vectorLayer = new VectorLayer({
        source: new VectorSource({
            url: 'assets/data/portugal.geojson',
            format: new GeoJSON()
        }),
        style: unselectedStyle
    });

    const mapOptions: MapOptions = {
        target: 'map',
        layers: [
            vectorLayer
        ],
        view: new View({
            center: fromLonLat([-8.611, 39.824]),
            zoom: 8.5
        })
    };

    useEffect(() => {

        const map = new Map(mapOptions);

        const selectInteraction = new Select({
            condition: pointerMove,
            addCondition: always
        });
        map.addInteraction(selectInteraction);

        selectInteraction.getFeatures().on('add', (event) => {
            console.log('on add', event);
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
                width={'50%'}
            >
                <Text fontSize={'3rem'} margin={'10px 0'}>Terras Lusas</Text>
                <Text fontWeight={'lighter'} margin={'10px 0'}>Sabes onde é a tal terrinha do teu amigo António?</Text>
                <HomeButton margin={'20px'} onClick={() => navigate('/daily')}>Jogar</HomeButton>
            </Container>
            <Container
                height={'100vh'}
                width={'50%'}

            >
                <div id="map"></div>
            </Container>
        </Container>
    </>;
};