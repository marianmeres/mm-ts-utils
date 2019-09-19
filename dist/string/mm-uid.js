"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates quasi uuid
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {string}
 */
function mmUid(length) {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
            .toLowerCase();
    };
    if (!length) {
        // prettier-ignore
        return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
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
