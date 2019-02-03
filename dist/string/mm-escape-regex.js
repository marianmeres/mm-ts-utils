"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param str
 * @returns {string}
 */
function mmEscapeRegExp(str) {
    return (str + '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
exports.mmEscapeRegExp = mmEscapeRegExp;
