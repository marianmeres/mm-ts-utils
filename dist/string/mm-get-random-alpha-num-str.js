"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param len
 * @param prefix
 */
function mmGetRandomAlphaNumStr(len, prefix) {
    if (prefix === void 0) { prefix = ''; }
    var salt = '';
    while (salt.length < len) {
        salt += Math.random()
            .toString(36)
            .substr(2);
    }
    return (prefix || '') + salt.substr(0, len);
}
exports.mmGetRandomAlphaNumStr = mmGetRandomAlphaNumStr;
