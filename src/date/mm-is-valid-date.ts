/**
 * @param date
 * @returns {boolean}
 */
export function mmIsValidDate(date) {
    return (
        date && Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
    );
}
