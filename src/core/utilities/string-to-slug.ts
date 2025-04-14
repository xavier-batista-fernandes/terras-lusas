export function stringToSlug(string: string) {
    return string
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}