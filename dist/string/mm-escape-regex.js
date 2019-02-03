/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param str
 * @returns {string}
 */
export function mmEscapeRegExp(str) {
    return (str + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
