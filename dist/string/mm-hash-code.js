"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript/8831937
function mmHashCode(str) {
    var hash = 0;
    if (str.length === 0) {
        return hash;
    }
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char; // tslint:disable-line
        // Convert to 32bit integer
        hash = hash & hash; // tslint:disable-line
    }
    return hash;
}
exports.mmHashCode = mmHashCode;
