/**
 * @param year
 * @param month
 * @returns {number}
 */
export function mmGetDaysInMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate();
}
