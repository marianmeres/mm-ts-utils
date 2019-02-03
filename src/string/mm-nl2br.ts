/**
 * http://phpjs.org/functions/nl2br/
 * @param str
 * @returns {string}
 */
export function mmNl2br(str: string): string {
    return `${str}`.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
}
