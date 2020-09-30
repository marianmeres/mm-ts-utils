"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mmParseBoolean = void 0;
/**
 * To be used for process.env vars...
 * @param val
 */
exports.mmParseBoolean = function (val) {
    if (typeof val === 'boolean') {
        return val;
    }
    if (Number.isInteger(val)) {
        return val !== 0;
    }
    if (typeof val !== 'string') {
        return !!val;
    }
    // normalize
    val = val.toLowerCase().trim();
    // maybe numeric string?
    var num = parseFloat(val);
    if (!isNaN(num)) {
        return num !== 0;
    }
    //
    switch (val) {
        case 'yes':
        case 'y':
        case 'true':
        case 'ok':
        case 'on':
        case 'enabled':
            return true;
        default:
            return false;
    }
};
