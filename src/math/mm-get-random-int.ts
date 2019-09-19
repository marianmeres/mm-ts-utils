/**
 * Returns a random integer between min and max
 * Note: Using Math.round() will give you a non-uniform distribution!
 *
 * @param min
 * @param max
 * @returns {any}
 */
export function mmGetRandomInt(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
