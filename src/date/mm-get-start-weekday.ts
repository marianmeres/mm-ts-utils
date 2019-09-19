/**
 * @param year
 * @param month
 * @returns {number}
 */
export function mmGetStartWeekday(year, month) {
    return new Date(year, month, 1).getDay();
}
