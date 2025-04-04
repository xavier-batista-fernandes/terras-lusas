import './home.css';
import { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { useGeographic } from 'ol/proj';
import { Select } from 'ol/interaction';
import { always, pointerMove } from 'ol/events/condition';
import { HomeButton } from '../../components/atoms/buttons/home-button/home-button.tsx';
import { Fill, Stroke, Style } from 'ol/style';
import { useNavigate } from 'react-router-dom';
import { getMunicipalitiesLayer } from '../../utilities/getMunicipalitiesLayer.ts';


export const Home = () => {

    useGeographic();
    const navigate = useNavigate();
    const mapElement = useRef(null);

    const unselectedStyle = new Style({
        stroke: new Stroke({
            color: 'black',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(211,211,211,0.66)',
        }),
        zIndex: 5,
    });


    const selectInteraction = new Select({
        condition: pointerMove,
        addCondition: always,
    });

    useEffect(() => {

        const mapInstance = new Map();

        const init = async () => {
            if (!mapElement.current) throw new Error('Map element not found.');

            const municipalitiesLayer = getMunicipalitiesLayer();
            municipalitiesLayer.setStyle(unselectedStyle);


            console.log('Setting target...');
            mapInstance.setTarget(mapElement.current);

            console.log('Setting view...');
            const view = new View({
                center: [-8.35, 39.35],
                zoom: 8.75,

            });
            mapInstance.setView(view);

            console.log('Adding layer...');
            mapInstance.addLayer(municipalitiesLayer);

            console.log('Adding interaction...');
            mapInstance.addInteraction(selectInteraction);

            selectInteraction.getFeatures().on('add', (event) => {
                const colors = ['#386641', '#6a994e', '#a7c957', '#f2e8cf', '#fb8b24'];
                const selectedStyle = new Style({
                    stroke: new Stroke({
                        color: 'black',
                        width: 1,
                    }),
                    fill: new Fill({
                        color: colors[Math.floor(Math.random() * colors.length)],
                    }),
                    zIndex: 10,
                });
                event.element.setStyle(selectedStyle);
            });
        };

        init().then(() => console.log('Setup complete.'));

        return () => {
            console.log('Disposing...');
            console.log('\n');

            mapInstance.setTarget(undefined);
            mapInstance.dispose();
        };

    }, []);

    return <div className={'home-page-container'}>
        <div className={'home-page-menu'}>
            <h1>Terras Lusas</h1>
            <p>Sabes onde é a tal terrinha do teu amigo António?</p>
            <div className={'home-page-actions'}>
                <HomeButton onClick={() => navigate('/marathon')}>Maratona</HomeButton>
                <HomeButton onClick={() => navigate('/explore')}>Explorar</HomeButton>
            </div>
        </div>
        <div className={'home-page-map'}>
            <div id="map" ref={mapElement}></div>
        </div>
    </div>;
};