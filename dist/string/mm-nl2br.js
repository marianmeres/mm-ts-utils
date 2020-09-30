"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmNl2br = void 0;
/**
 * http://phpjs.org/functions/nl2br/
 * @param str
 * @returns {string}
 */
function mmNl2br(str) {
    return ("" + str).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
}
exports.mmNl2br = mmNl2br;
