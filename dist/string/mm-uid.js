"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmUid = void 0;
/**
 * creates quasi uuid
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @param length
 * @param separator
 * @returns {string}
 */
function mmUid(length, separator) {
    if (separator === void 0) { separator = '-'; }
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toLowerCase();
    };
    if (!length) {
        // prettier-ignore
        return (s4() + s4() + separator + s4() + separator + s4() + separator + s4() + separator + s4() + s4() + s4());
    }
    // custom length
    var c = Math.ceil(length / 4);
    var out = '';
    for (var i = 0; i < c; i++) {
        out += s4();
    }
    return out.substr(0, length);
}
exports.mmUid = mmUid;
