export function getMarathonHistory() {
    const rawData = window.localStorage.getItem('marathonHistory');
    return rawData ? JSON.parse(rawData) : [];
}