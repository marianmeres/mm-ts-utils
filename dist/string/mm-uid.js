"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * creates quasi uuid
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {string}
 */
function mmUid(length) {
    let s4 = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
        .toLowerCase();
    if (!length) {
        // prettier-ignore
        return (s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4());
    }
    // custom length
    let c = Math.ceil(length / 4);
    let out = '';
    for (let i = 0; i < c; i++) {
        out += s4();
    }
    return out.substr(0, length);
}
exports.mmUid = mmUid;
