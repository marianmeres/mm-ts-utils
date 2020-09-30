"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmUcfirst = void 0;
/**
 * @param str
 * @returns {string}
 */
function mmUcfirst(str) {
    str += '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.mmUcfirst = mmUcfirst;
