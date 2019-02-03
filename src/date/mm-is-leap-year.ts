/**
 * @param year
 * @returns {boolean}
 */
export function mmIsLeapYear(year) {
    return new Date(year, 1, 29).getMonth() === 1;
}