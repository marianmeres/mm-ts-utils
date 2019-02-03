import { mmIsValidDate } from './mm-is-valid-date';
/**
 * @param d1
 * @param d2
 * @returns {Object|boolean}
 */
export function mmIsSameDay(d1, d2) {
    return (mmIsValidDate(d1) &&
        mmIsValidDate(d2) &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate());
}
