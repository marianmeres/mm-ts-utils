"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mm_escape_regex_1 = require("./mm-escape-regex");
/**
 * https://stackoverflow.com/questions/10045122/replace-many-values-in-a-string-based-on-search-replace-pairs
 * https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings/15604206
 *
 * @param str
 * @param map
 * @param {boolean} ignoreCase
 * @returns {string | any | void}
 */
function mmReplaceMap(str, map, ignoreCase) {
    if (ignoreCase === void 0) { ignoreCase = false; }
    var patterns = [];
    Object.keys(map).forEach(function (k) { return patterns.push(mm_escape_regex_1.mmEscapeRegExp(k)); });
    var regExp = new RegExp(patterns.join('|'), 'g' + (ignoreCase ? 'i' : ''));
    return str.replace(regExp, function (match) {
        if (ignoreCase) {
            match = match.toLowerCase();
        }
        var replaced = map[match];
        if (replaced === null || replaced === void 0) {
            return '';
        }
        return replaced;
    });
}
exports.mmReplaceMap = mmReplaceMap;
