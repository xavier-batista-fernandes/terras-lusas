export const fetchMunicipalities = async () => {
    const URL = 'assets/data/portugal.geojson';

    const response = await fetch(URL);
    // TODO: see how to handle errors when awaiting instead of using then or catch
    return response.json();

};