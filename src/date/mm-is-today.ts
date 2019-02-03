import { mmIsSameDay } from './mm-is-same-day';

/**
 * @param d
 */
export function mmIsToday(d: Date): boolean {
    return mmIsSameDay(d, new Date());
}