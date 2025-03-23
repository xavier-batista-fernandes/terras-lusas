export const fetchMunicipalities = async () => {
    const URL = 'assets/data/municipalities-heavy.geojson';

    const response = await fetch(URL);
    // TODO: see how to handle errors when awaiting instead of using then or catch
    return response.json();

};