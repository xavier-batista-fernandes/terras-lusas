import VectorLayer from 'ol/layer/Vector';

export const getRandomFeature = (vectorLayer: VectorLayer) => {
    if (!vectorLayer) throw new Error('Vector layer is required');

    const vectorSource = vectorLayer.getSource();
    if (!vectorSource) throw new Error('Source is required');

    const features = vectorSource.getFeatures();
    if (!features) throw new Error('Features are required');
    if (features.length === 0) throw new Error('Features array can\'t be empty');

    return features[Math.floor(Math.random() * features.length)];
};