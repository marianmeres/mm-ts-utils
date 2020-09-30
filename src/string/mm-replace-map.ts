import { mmEscapeRegExp } from './mm-escape-regex';

/**
 * https://stackoverflow.com/questions/10045122/replace-many-values-in-a-string-based-on-search-replace-pairs
 * https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings/15604206
 *
 * @param str
 * @param map
 * @param {boolean} ignoreCase
 * @returns {string | any | void}
 */
export function mmReplaceMap(str, map, ignoreCase = false) {
    let patterns = [];
    Object.keys(map).forEach((k) => patterns.push(mmEscapeRegExp(k)));
    let regExp = new RegExp(patterns.join('|'), 'g' + (ignoreCase ? 'i' : ''));
    return str.replace(regExp, (match) => {
        if (ignoreCase) {
            match = match.toLowerCase();
        }
        let replaced = typeof map[match] === 'function' ? map[match]() : map[match];
        if (replaced === null || replaced === void 0) {
            return '';
        }
        return replaced;
    });
}
