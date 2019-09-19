import { mmIsValidDate } from './mm-is-valid-date';

/**
 * @param d1
 * @param d2
 */
export function mmIsSameMonth(d1: Date, d2: Date): boolean {
    return (
        mmIsValidDate(d1) &&
        mmIsValidDate(d2) &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth()
    );
}
