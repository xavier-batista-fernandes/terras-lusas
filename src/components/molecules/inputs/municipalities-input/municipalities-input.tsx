import './municipalities-input.css';
import { getMunicipalitiesLayer } from '../../../../utilities/getMunicipalitiesLayer.ts';

export const MunicipalitiesInput = () => {
    const onInput = (event: any) => {
        // console.log(event);
        console.log(event.target.value);
    };

    const municipalitiesLayer = getMunicipalitiesLayer();
    if (!municipalitiesLayer) throw new Error('Municipalities layer not found.');

    const municipalitiesSource = municipalitiesLayer.getSource();
    if (!municipalitiesSource) throw new Error('Municipalities source not found.');

    let municipalitiesArray: string[] = ['sadasd', 'sadasdasdas'];
    municipalitiesSource.on('addfeature', () => {
        console.log('featuresloadend', municipalitiesSource.getFeatures());
        municipalitiesArray = municipalitiesSource.getFeatures().map(feature => feature.getProperties()['Municipality']);
    });


    return <>
        <div>
            <input
                type={'text'}
                placeholder={'Lisboa...'}
                list={'options'}
                className={'municipalities-input'}
                onInput={event => onInput(event)}
            />
            <datalist id="options">
                {municipalitiesArray.map((municipality, index) => <option key={index} value={municipality} />)}
            </datalist>
        </div>
    </>;
};