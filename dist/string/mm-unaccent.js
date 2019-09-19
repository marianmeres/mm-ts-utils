"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
 * I guess more robust alternative: https://github.com/andrewrk/node-diacritics.git
 * @param str
 */
function mmUnaccent(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
exports.mmUnaccent = mmUnaccent;
