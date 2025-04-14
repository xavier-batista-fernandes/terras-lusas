export function getRandomColor() {
    const CORRECT_GUESS_COLORS = ['#53b565', '#69a545', '#a7c957', '#a2df47', '#adc178'];
    return CORRECT_GUESS_COLORS[Math.floor(Math.random() * CORRECT_GUESS_COLORS.length)];
}